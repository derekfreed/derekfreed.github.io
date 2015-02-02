//Derek Freed
//Hashlink.h

#ifndef HASHLINK_H
#define HASHLINK_H

#include "Hashnode.h"

class Hashlink{

 public:

  Hashlink();               // Constructor
  ~Hashlink();              // Destructor
  void insert(Hashnode *);  // Insert a Hashnode into the linked list
  void deleteNode(int);     // Delete a Hashnode from the linked list
  Hashnode *getFront();     // Return front node pointer

 private:

  Hashnode *front;  // Pointer to the front of the list

};

#endif
