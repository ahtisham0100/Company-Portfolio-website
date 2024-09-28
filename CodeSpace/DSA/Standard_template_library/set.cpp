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


 st.find(5);

for(auto it:st){
    cout<<it<<" ";
}

 auto it = st.find(2);
 it++; it++;
 cout<<*it;
    return 0;
}
