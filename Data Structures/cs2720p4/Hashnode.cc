//Derek Freed
//Hashnode.cc
#ifndef NULL
const int NULL = 0;
#endif  // NULL

#include <string>
#include <iostream>

#include "Hashnode.h"

using namespace std;

// Constructor
Hashnode::Hashnode(){
  next = NULL;
}

// Overloaded constructor
Hashnode::Hashnode(int newID, double newGPA, string newName, Hashnode *ptrnext){
  // Set data members as necessary
  id = newID;
  gpa = newGPA;
  name = newName;
  next = ptrnext;
}

// Destructor
Hashnode::~Hashnode(){
  if(next != NULL) delete next;
}

// Returns id number
int Hashnode::getID(){
  return id;
}

// Returns GPA
double Hashnode::getGPA(){
  return gpa;
}

// Returns student name
string Hashnode::getName(){
  return name;
}

// Return pointer to next Hashnode
Hashnode *Hashnode::getNext(){
  return next;
}

// Set the ID
void Hashnode::setID(int newID){
  id = newID;
}

// Set the GPA
void Hashnode::setGPA(double newGPA){
  gpa = newGPA;
}

// Set the student name
void Hashnode::setName(string newName){
  name = newName;
}

// Set the next pointer
void Hashnode::setNext(Hashnode *newNext){
  next = newNext;
}
