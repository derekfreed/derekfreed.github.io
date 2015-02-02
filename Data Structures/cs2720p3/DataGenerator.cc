//Derek Freed
//CSCI 2720
//DataGenerator.cc
#include <stdlib.h>
#include <climits>
#include <iostream>
#include <time.h>
#include "MergeSort.h"
#include "InsertionSort.h"

using namespace std;

int main()
{
	int n;
	long totalComparisons=0;
	long averageComparisons;

	cout<<"Enter the size of the array:"<<endl;
	cin>>n;

	
	
	//**************************MERGE SORT***********************************//

	cout<<"Running Merge Sort on 20 random arrays..."<<endl;	

	srand(time(NULL));		//pseudo random number generator
	//does mergesort 20 times
	for(int j=0; j<20; j++)
	{		
        	int arr[n];
        	//creates a random data list
        	for(int i=0; i<n; i++)
        	{
	        	arr[i]=rand()%INT_MAX;
        	}

		mergeSort(arr, 0, n-1);
		totalComparisons+=getMergeComparison();
	}
	cout<<"20 Merge Sort iterations finished."<<endl;

	averageComparisons=totalComparisons/20;
	cout<<"Average number of comparisons from 20 random arrays: "<<averageComparisons<<endl;

//**************************INSERTION SORT***********************************//

	totalComparisons=0;			//reinitialize to 0 before insertion sort

	cout<<"Running Insertion Sort on 20 random arrays..."<<endl;
	
	srand(time(NULL));		//pseudo random number generator
	//does insertionsort 20 times
	for(int j=0; j<20; j++)
	{
		int arr[n];
	    	//creates a random data list
		for(int i=0; i<n; i++)
		{
	        	arr[i]=rand()%INT_MAX;
	    	}
			
		insertionSort(arr, n);
		totalComparisons+=getInsertionComparison();
	}
	cout<<"20 Insertion Sort iterations finished."<<endl;

	averageComparisons=totalComparisons/20;
	cout<<"Average number of comparisons from 20 random arrays: "<<averageComparisons<<endl; 
}
