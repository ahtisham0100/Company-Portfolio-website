#include <bits/stdc++.h>
 using namespace std; 

 int main(){ 

set<int> st; 
st.insert(1);
st.insert(3);

for (size_t i = 0; i < 10; i++)
{
    st.insert(i); 
}

for(auto it:st){
    cout<<it<<" ";
}


    return 0;
}
