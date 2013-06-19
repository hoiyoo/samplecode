#!/bin/bash

BUILD_LOG=`pwd`"/output.log"
DIST_DIR="dist"
if [ -z "$BUILD_VERSION_NUMBER" ]; then
    BUILD_VERSION_NUMBER=`date "+%Y%d%m%H%M%S"`
fi

PACKAGE_VERSION=1.0
PACKAGE_DIR="package"
PACKAGE_BASENAME="klink-web-client"
IMAGE_DIR=buildimage/${PACKAGE_BASENAME}/public
DOC_SOURCE_DIR=packagedocs
PACKAGE_NAME="${PACKAGE_BASENAME}-${BUILD_VERSION_NUMBER}"
PACKAGE_LOC=""
PACKAGE_ROOT=$PACKAGE_DIR/$PACKAGE_NAME/debian/$PACKAGE_LOC
DOC_AREA=$PACKAGE_DIR/$PACKAGE_NAME/debian/usr/share/doc/klink-web-client
CONTROL_AREA=$PACKAGE_DIR/$PACKAGE_NAME/debian/DEBIAN
CONTROL_FILE=$CONTROL_AREA/control
PYTHON=`which python`

#
# Display a warning message
# :param - Warning message
#
function display_warning() {
    if [ -z "$1" ]; then
        echo "WARNING! -- ?"
    else
        echo "WARNING!: $1"
    fi
}

#
# Log information
# :param - Information message
#
function log_info() {
    if [ -z "$1" ]; then
        display_warning "log_info called without parameter"
    else
        echo "$1" >> $BUILD_LOG
    fi
}

#
# Create a directory in the package tree
# :param - relative directory to create
#
function create_packaged_dir() {
    if [ -z "$1" ]; then
        display_warning "create_packaged_dir called without parameter"
    else
        log_info "Creating package directory [$PACKAGE_ROOT/$1]"
        mkdir -p $PACKAGE_ROOT/$1
    fi
}

#
# Copy files to package dirctory
# :param - file spec for source
# :param - relative destination (optional)
function copy_to_package() {
    if [ -z "$1" ]; then
        display_warning "copy_to_package called without parameters"
    else
        if [ -z "$2" ]; then
            log_info "copying $1 -> $PACKAGE_ROOT/"
            cp $1 $PACKAGE_ROOT/
        else
            log_info "copying $1 -> $PACKAGE_ROOT/$2"
            cp $1 $PACKAGE_ROOT/"$2"
        fi
    fi
}

#
# Recursive copy to destination in package
# :param - file spec for source
# :param - relative destination (optional)
function copy_all_to_package() {
    if [ -z "$1" ]; then
        display_warning "copy_all_to_package called without parameters"
    else
        if [ -d "$1" ]; then
            if [ -z "$2" ]; then
                log_info "copying contents of $1 -> $PACKAGE_ROOT/"
                cp -r "$1"/* $PACKAGE_ROOT/
            else
                log_info "Copying contents of $1 -> $PACKAGE_ROOT/$2"
                cp -r "$1"/* $PACKAGE_ROOT/$2
            fi
        else
            copy_to_package "$1" "$2"
        fi
    fi
}




echo "Output logged to $BUILD_LOG"
# Create the log file
echo "Build [$BUILD_NUMBER] started at" `date` > $BUILD_LOG

# Step 0 - make sure environment is clean
# make sure package directory is empty
if [ -e $PACKAGE_DIR/$PACKAGE_NAME ]; then
    log_info "Removing old package directory [$PACKAGE_DIR/$PACKAGE_NAME]"
    rm -rf $PACKAGE_DIR/$PACKAGE_NAME
fi
# make sure dist directory is empty
if [ -e $DIST_DIR ]; then
    log_info "Removing contents of $DIST_DIR directory"
    rm -rf dist/*
fi

# System layout
create_packaged_dir var/www/web

# Copy files
copy_all_to_package $IMAGE_DIR var/www/web

#  Populate required files
log_info "Creating required doc files"
mkdir -p $DOC_AREA
cp $DOC_SOURCE_DIR/LICENSE.txt $DOC_AREA/copyright
cp $DOC_SOURCE_DIR/README.txt $DOC_AREA/README.Debian
CHANGELOG_DATE=`date "+%Y-%m-%d"`
git log -n 100 --pretty=format:'%h -%d %s %cn (%ci)' --abbrev-commit > $DOC_AREA/changelog 

cp $DOC_AREA/changelog $DOC_AREA/changelog.Debian

log_info "Compressing changelog"
gzip --best $DOC_AREA/changelog
gzip --best $DOC_AREA/changelog.Debian

log_info "Creating control area [$CONTROL_AREA]"
mkdir -p $CONTROL_AREA

log_info "Creating control file [$CONTROL_FILE]"
# Create control file
cat > $CONTROL_FILE <<EOF
Package: $PACKAGE_BASENAME
Version: $PACKAGE_VERSION
Section: web
Priority: optional
Essential: no
Architecture: all
Depends: 
Provides: klink-web-client
Maintainer: Klink CDC <support@klinkcdc.com>
Description: Klink web client
EOF

log_info "Copying postinst - none at this time"
#cp scripts/debian_postinst $CONTROL_AREA/postinst
log_info "Copying prerm - none at this time"
#cp scripts/debian_prerm $CONTROL_AREA/prerm

# Update permissions, required for debian distributions
find $PACKAGE_ROOT -type d | xargs chmod 755

# Step 4 - Build the package
CUR_DIR=`pwd`
if [ ! -e $DIST_DIR ]; then
    mkdir $DIST_DIR
fi
pushd $PACKAGE_DIR/$PACKAGE_NAME
fakeroot dpkg-deb -b debian $CUR_DIR/$DIST_DIR/$PACKAGE_NAME.amd64.deb
popd

# Step 5 - Cleanup
if [ -e $PACKAGE_DIR/$PACKAGE_NAME ]; then
    log_info "Cleaning up package directory [$PACKAGE_DIR/$PACKAGE_NAME]"
    rm -rf $PACKAGE_DIR/$PACKAGE_NAME
fi

echo "Build [$BUILD_NUMBER] completed at" `date` >> $BUILD_LOG
