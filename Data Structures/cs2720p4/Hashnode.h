//Derek Freed
//Hashnode.h
#ifndef HASHNODE_H
#define HASHNODE_H

#include <string>

using namespace std;

class Hashnode{

 public:

  Hashnode();                                               // Constructor
  Hashnode(int, double, string, Hashnode *);                // Constructor
  ~Hashnode();                                              // Destructor
  int getID();                                              // Return ID
  double getGPA();                                          // Return GPA
  string getName();                                         // Return name
  Hashnode *getNext();                                      // Return next ptr
  void setID(int);                                          // Set ID #
  void setGPA(double);                                      // Set GPA
  void setName(string);                                     // Set name
  void setNext(Hashnode *);                                 // Set next ptr

 private:

  Hashnode *next;  // Pointer to next node
  int id;          // Student ID #
  double gpa;      // Student GPA
  string name;     // Student name

};

#endif
