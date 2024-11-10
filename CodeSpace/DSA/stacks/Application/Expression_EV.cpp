#include  <bits/stdc++.h>
using namespace std; 


  int precedence(char c){ 
    if (c=='+'||c=='-')
    {
      return 1; 
    }  else  if (c=='*'||c=='/')
     {
    return  2;  
     } else { 
        return  -1;
     }
     
    
  }
   
     string infixtoPrefix(string s){ 
        //revervse the string string  
        reverse(s.begin(),s.end());   //in algorithims lib 
//make a stack 
stack<char>  st; 
string res;
           
             //iterating over the original string
              for (int i = 0; i <s.length(); i++)
              { 
                 //if string is an operand
                if (s[i]>'a'&&s[i]<'z'||s[i]>'A'&&s[i]<'Z')
                {
                     res+=s[i]; //append the result string by concataion;
                      

                } else if (s[i]=='(') { 
st.push(s[i]);
                } else if( s[i]==')'){ 
                    while(!st.empty()  && st.top()!='(') 
 
  res+=s[i]; 
  st.pop();

                }
                
              }
              
               
             
     }
  
   
    
int main(){ 
     



     return 0; 
}