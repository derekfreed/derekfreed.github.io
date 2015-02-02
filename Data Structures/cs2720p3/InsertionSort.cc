//Derek Freed
//CSCI 2720
//InsertionSort.cc
#include "InsertionSort.h"

long insertCompare=0;     //initiliaze to 0
void insertionSort(int arr[], int n)     //n is size of arr
{
	//length, counters, total comparisons, and temp for swap
	int length=n;
	int i;
	int j;
	int temp;   
	
    	for(i=1; i<length; i++) 
    	{
        	j=i;
		//swaps if current element is less than one before it and j is greater than 0
        	while(j>0 && arr[j-1]>arr[j]) 
        	{
        		temp=arr[j];
           		arr[j]=arr[j-1];
            		arr[j-1]=temp;
            		j--;
            		insertCompare++;
        	}
    	}
}
long getInsertionComparison()
{
	long temp=insertCompare;
	insertCompare=0;
	return temp;
}
