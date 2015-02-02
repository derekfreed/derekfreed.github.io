//Derek Freed
//HashTest.cc
#include <iostream>
#include <new>
#include <string>

#include "Hashtable.h"

#ifndef NULL
const int NULL = 0;
#endif  // NULL

using namespace std;

int main(){
  // Create a character to read commands from standard input
  char command;

  // Create id, gpa, and name variables
  int id;
  double gpa;
  char name[80];

  Hashtable students;
  Hashnode *tempNode;

  // Perform command actions on list
  do {
    cin >> command;
    switch( command ) {
    case 'i':
    case 'I':
      cin >> id;
      cin >> gpa;
      cin.getline(name, 80);
      tempNode = new Hashnode(id, gpa, name, NULL);
      //assert(tempNode != 0);
      students.insert(tempNode);
      break;
    case 'd':
    case 'D':
      cin >> id;
      students.deleteNode(id);
      break;
    case 's':
    case 'S':
      students.printTable();
      break;
    default:
      // do nothing
      break;
    }
  } while (!((command == 'Q') || (command == 'q')));

  return 0;
}
