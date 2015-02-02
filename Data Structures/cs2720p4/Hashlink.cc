//Derek Freed
//Hashlink.cc
#ifndef NULL
const int NULL = 0;
#endif  //NULL

#include <iostream>
#include <stdlib.h>
#include "Hashlink.h"

using namespace std;

//Constructor
Hashlink::Hashlink(){
  front = NULL;
}

//Destructor
Hashlink::~Hashlink(){
  delete front;
}

//Insert a Hashnode into the linked list
void Hashlink::insert(Hashnode *newNode){
  //Pointer used to search through the list
  Hashnode *P = front;
  //Check to see if node is already in list and replace with new data
  while(P != NULL)
  {
    if(P->getID() == newNode->getID())
    {
      P=newNode;
      return;
    }
    P = P->getNext();
  }
  //Insert at front if key isn't already in the list
  newNode->setNext(front);
  front = newNode;
}

//Delete a Hashnode from the linked list
void Hashlink::deleteNode(int key){
  //Pointers used to search through the list
  Hashnode *P = front;
  Hashnode *Q = NULL;
  //Search through list to find node w/ key
  while(P != NULL)
  {
    //if key is a match then delete P
    if(P->getID() == key)
    {
        //if P is front then just reset the front and delete P
        if(P == front)
        {
          front = front->getNext();
          free(P);
          return;
        }
        //set (previous)Q's next to P's next and then delete P
        else
        {
          Q->setNext(P->getNext());
          free(P);
          return;
        }
    }
    //Increment Q and P to the next slot
    else
    {
      Q = P;
      P = P->getNext();
    }
  }
  //See if node is at front of list; if so, delete properly and return

}

//Return pointer to front node
Hashnode *Hashlink::getFront(){
  return front;
}
