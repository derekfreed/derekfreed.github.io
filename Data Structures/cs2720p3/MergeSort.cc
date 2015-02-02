//Derek Freed
//CSCI 2720
//MergeSort.cc
#include "MergeSort.h"

long mergeCompare=0;     //initiliaze to 0
void merge( int arr[], int low, int mid, int high )
{
        int lowIndex=low;
        int m=mid+1;
        int i=low;
        int j;
        int temp[high];

        while(lowIndex<=mid && m<=high)
        {
        	if(arr[lowIndex]<=arr[m])
        	{
                	temp[i]=arr[lowIndex];
                	mergeCompare++;
                	i++;
                	lowIndex++;
            	}
        	else
        	{
                	temp[i]=arr[m];
                	mergeCompare++;
                	i++;
                	m++;
        	}
        }

        if(lowIndex==m)
        {
        	while(m<=high)
		{
                	temp[i]=arr[m];
			i++;
			m++;
		}
        }
        else
        {
        	while(lowIndex<=mid)
        	{
                	temp[i]=arr[lowIndex];
			i++;
			lowIndex++;
        	}
        }
	//puts the newly sorted temp array into arr
        for(j=low; j<=high; j++)
        	arr[j]=temp[j];

}

//cuts array, sorts each part, and merges when each piece is sorted
void mergeSort(int arr[], int low, int high)
{
	if(low<high)
	{
		int mid=(low+high)/2;
		
		
		//splitting array in half and sorting them (recursive)
		mergeSort(arr, low, mid);
		mergeSort(arr, mid+1, high);
		
		merge(arr, low, mid, high);
		
	}
	
}	
long getMergeComparison()
{
	long temp=mergeCompare;
	mergeCompare=0;
	return temp;
}
