//Derek Freed
//Hashtable.cc
#include <iostream>
#include <new>
#include <string>

#include "Hashtable.h"

using namespace std;

//Constructor
Hashtable::Hashtable(){
  //Do nothing
}

//Destructor
Hashtable::~Hashtable(){
  delete table;
}

//Insert a new node into the hash table
void Hashtable::insert(Hashnode *newNode){
  //Calculate hash key
  int hashIndex = hash(newNode->getID());
  //Insert node into proper bucket
  table[hashIndex].insert(newNode);
}

//Delete a node from the hash table
void Hashtable::deleteNode(int id){
  //Calculate hash key
  int hashIndex = hash(id);       //student id is the key
  //Delete node from proper bucket
  table[hashIndex].deleteNode(id);
}

//Print Hashtable to output
void Hashtable::printTable(){
  //This function formats the hash table and prints to output

  cout << "\n\n";

  for(int i=0; i<17; i++){
    if(i > 9){
      cout << i << (((table[i].getFront()) == NULL) ? "    (NULL)\n" : "--> ");
    }else{
      cout << i << (((table[i].getFront()) == NULL) ? "     (NULL)\n" : "-->  ");
    }

    Hashnode *P = table[i].getFront();
    while(P != NULL){
      cout << "(";
      PrintSpaces(P->getID());
      cout << ")";
      cout << (((P->getNext()) == NULL) ? "\n" : "--> ");
      P = P->getNext();
    }
  }

  cout << "\n" << endl;
}

//Hash function
int Hashtable::hash(int key){
	key = key % 17;
  return key;
}

//Support function used to format printing output
void Hashtable::PrintSpaces(int num){
  if(num <= 99999999) cout << "0";
  if(num <= 9999999) cout << "0";
  if(num <= 999999) cout << "0";
  if(num <= 99999) cout << "0";
  if(num <= 9999) cout << "0";
  if(num <= 999) cout << "0";
  if(num <= 99) cout << "0";
  if(num <= 9) cout << "0";
  cout << num;
}
