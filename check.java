package name.fraser.neil.plaintext;

public class check {

	public static void main(String[] args) {
		// TODO Auto-generated method stub

		diff_match_patch dmp = new diff_match_patch();
		
		
	   int i= dmp.diff_commonOverlap("123456xxx", "xxxabcd56");
	   
	   System.out.println(">>="+i);
	   
	   i= dmp.diff_commonSuffix("1234", "xyz1234");
	   
	   System.out.println(">>="+i);

}
}
