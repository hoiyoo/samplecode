public void json2Object() {
		// given
		String jsonString = "{\"name\":\"Soo Philip Kim\",\"emailAddress\":\"philipjkim@gmail.com\",\"department\":\"DEVELOPMENT\",\"yearJoined\":2012}";

		// when
		JSONObject object = (JSONObject) JSONValue.parse(jsonString);

		// then
		@SuppressWarnings("unchecked")
		Set<String> keySet = object.keySet();
		for (String key : keySet) {
			Object value = object.get(key);
			System.out.printf("%s=%s (%s)\n", key, value, value.getClass()
					.getSimpleName());
		}

		assertThat(object.get("name").toString(), is("Soo Philip Kim"));
		assertThat(object.get("emailAddress").toString(),
				is("philipjkim@gmail.com"));
		assertThat(object.get("department").toString(), is("DEVELOPMENT"));
		assertThat(object.get("yearJoined").toString(), is("2012"));
	}


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



public class  LongestCommonSubString

{

    /** function lcs **/

    public String lcs(String str1, String str2)

    {
    	
        int l1 = str1.length();
        int l2 = str2.length();

        char[] aa = str1.toCharArray();
        
        int[][] arr = new int[l1 + 1][l2 + 1];
        int len = 0, pos = -1;

        for (int x = 1; x < l1 + 1; x++)
        {
            for (int y = 1; y < l2 + 1; y++)
            {
                if (aa[x - 1] == str2.charAt(y - 1))
                {
                        arr[x][y] = arr[x - 1][y - 1] + 1;
                        if (arr[x][y] > len)
                        {
                            len = arr[x][y];
                            pos = x;
                        }               
                }
                else
                    arr[x][y] = 0;
            }
        }        

        return str1.substring(pos - len, pos);

    }

 

    /** Main Function **/

    public static void main(String[] args) throws IOException

    {    

   
        String str1="aabcdefg12ttxx";
        String str2="ddbcdefg15ttxx";

        LongestCommonSubString obj = new LongestCommonSubString(); 

        String result = obj.lcs(str1, str2);

 

        System.out.println("\nLongest Common Substring : "+ result);

    }

}
