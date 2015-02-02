//Derek Freed
//treescan.h
//10/28/2014
//treescan is like a library of functions used to traverse the binary search tree
#ifndef TREESCAN_H
#define TREESCAN_H

#include <new>
#include "bstree.h"
#include "treenode.h"
#include "queue.h"


template <class T>
void InOrderVisit(TreeNode *t, void visit(T& item))
{
    if(t!=NULL)
   	{
        // descend left
      	InOrderVisit(t->getLeft(), visit); 
        //visit inbetween recursion
      	visit(t->value); 
        // descend right 
      	InOrderVisit(t->getRight(), visit); 
    }
};
template <class T>
void PreOrderVisit(TreeNode *t, void visit(T& item))
{
	  if(t!=NULL)
   	{
        //visit before recursion
   		  visit(t->value);  
        // descend left
      	PreOrderVisit(t->getLeft(), visit); 
        // descend right 
      	PreOrderVisit(t->getRight(), visit); 
    }
};
template <class T>
void PostOrderVisit(TreeNode *t, void visit(T& item))
{
	  if(t!=NULL)
   	{
        // descend left
      	PostOrderVisit(t->getLeft(), visit);
        // descend right  
      	PostOrderVisit(t->getRight(), visit);
        //visit after recursion 
      	visit(t->value);  
    }
};
template <class T>
void LevelScan(TreeNode *t, void(T& item))
{
    //prepare a queue
	  Queue<TreeNode<T> *> queue;  
   	TreeNode<T> *n;

    //put t in the queue
   	queue.QInsert(t);  
   	while(!Q.QEmpty())
   	{
      	//delete the node from queue and visit
      	n=queue.QDelete();
      	void(n->value); 
            
      	//if there is a left child, insert into queue
      	if(n->getLeft()!=NULL)
       		queue.QInsert(n->getLeft());
      	//if there is a right child, insert into queue
      	if(n->getRight()!=NULL)
       		queue.QInsert(n->getRight());
    }
};

#endif
