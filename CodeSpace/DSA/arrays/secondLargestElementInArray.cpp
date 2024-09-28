public:
  
   int getSecondLargest(vector<int> &arr){ 
  
  
  if(arr.size()<2) 
  return -1;
   int max= (-1) , secondmax =(-1);
   
       for(int i=0; i<arr.size(); i++){ 
           if(arr[i]>max)
            max=arr[i];
            
         
   }
    // Function returns the second
    // largest elements
    for(int i=0;i<arr.size();i++){
       if(arr[i]>secondmax && arr[i]<max)  //array[i]>secondmax's present
       //value but smaller than max value ;
       secondmax=arr[i];
}
    return secondmax;}