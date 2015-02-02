//Derek Freed
//Hashtable.h
#ifndef HASHTABLE_H
#define HASHTABLE_H

#include "Hashlink.h"

class Hashtable{

 public:

  Hashtable();              // Constructor
  ~Hashtable();             // Destructor
  void insert(Hashnode *);  // Insert a node into the hash table
  void deleteNode(int);     // Delete a node in the hash table
  void printTable();        // Prints the table

 private:

  void PrintSpaces(int);  // Support function for printing to output
  int hash(int);          // Hash function
  Hashlink table[17];     // Hash table structure

};

#endif
