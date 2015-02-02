//Derek Freed
//bstree.h
//10/28/2014
//Binary Search Tree Class used to store information in a manner that is based off lesser values on left greater values on right
#ifndef BSTREE_H
#define BSTREE_H

#include <new>
#include "treenode.h"
#include "iostream"

using namespace std;

template <class T> class BinSTree
{
 	friend class TreeNode <T>;
	
	public:
		
		BinSTree()
		{
			*root=NULL;
			*current=NULL;
			size=0;
		}
		BinSTree(const BinSTree &tree)
		{
			root=CopyTree(tree.GetRoot());
			current=root;
			size=tree.TreeSize();
		}
		~BinSTree()
		{
			DeleteTree(root);
			root=NULL;
		}
	  	void PrintTree(TreeNode *t, int level)
	  	{
	  		 	if (t != NULL)
			   {
			      	// print right side of t
			      	PrintTree(t->getRight(), level+1);
			      	//set the right amount of tabs
			       	for(int i=0; i<level; i++) 
      					cout << "\t";
			      	cout<< t->value <<endl;
			      	//print left side of t
			      	PrintTree(t->getLeft(), level+1);
			   }
	  	}
	  	void PrintVTree(TreeNode *t, int valueWidth, int screenWidth)
	  	{
	  		//could not figure out the implementation of PrintVTree
	  	}
	  	void CountLeaf(TreeNode *t, int &count)
	  	{
		   	if(t != NULL) 
		   	{
		   	   	CountLeaf(t->getLeft(), count);
		   	   	CountLeaf(t->getRight(), count); 

		   	   	//if t is a leaf, increment count
		   	   	if(t->getLeft()==NULL && t->getRight()==NULL)
		   	   		count++;
		   }
		}
	  	int Depth(TreeNode *t)
	  	{
	  		int dLeft;
	  		int dRight;
	  		int dVal;

   			if(t==NULL) 
     		 	dVal=-1;
   			else
   			{
      			dLeft=Depth(t->getLeft());
      			dRight=Depth(t->getRight());
      			if(dLeft>dRight)
      				dVal=dLeft+1;
      			else
      				dVal=dRight+1;
   			}
   			return dVal;
	  	}
	  	int Find(T& item)
	  	{
	  		FindNode(item, current);
	  	}
	  	BinSTree& operator= (const BinSTree& b)
	  	{
	  		//overloads = operator
	  		if(this != &b)
				root = CopyTree(v.GetRoot());
			return *this;
	  	}
	  	void Insert(const T& item)
	  	{
	  		//if there is no root make the item into root
	  		if(root==NULL)
	  		{
	  			root=GetTreeNode(item, NULL, NULL);
	  		}

	  		TreeNode <T> *parent=NULL;
		    TreeNode <T> *t=root;
		    TreeNode <T> *newNode;

		    //end if subtree is empty
		    while(t!=NULL)
		    {
		        //change the parent and go left if item is less or right otherwise
		        parent=t;
		        if(item<t->value)
		            t=t->getLeft();
		        else 
		            t=t->getRight();
		    }
		  
		    // create the newNode
		    newNode=GetTreeNode(item, NULL, NULL);
		    
		    // if parent is NULL, make newNode the root
		    if(parent==NULL)
		        root=newNode;
		        
		    // if item is less than parent, insert on the left        
		    else if(item<parent->value)                   
		        parent->getLeft()=newNode;
		    
		    // if item is greater than or equal to parent, insert on the right    
		    else     
		        parent->getRight()=newNode;
		        
		    //make current the newNode and increment size
		    current=newNode;
		    size++;
	  	}
	  	void Delete(const T& item)
	  	{
	  		// parent is the parent of the deleted node
		    TreeNode <T> *parent;
		  	// delNode is the deleted node
		    TreeNode <T> *delNode;
		    // repNode replaces the deleted node
		    TreeNode <T> *repNode;
		    
		    //find the node to be deleted
		    delNode=FindNode(item, parent);
		    if(delNode==NULL)
		        return;
		    else if(delNode->getRight()==NULL)
		        repNode=delNode->getLeft();
		    else if(delNode->getLeft()==NULL)
		        repNode=delNode->getRight();
		    else
		    {
		        // repParent is the parent of the replacement node
		        TreeNode <T> *repParent=delNode;
		        repNode=delNode->getLeft();
		    
		        //move down right subtree of left child of deleted node
		        while(repNode->getRight()!=NULL)
		        {
		            repParent=repNode;
		            repNode=repNode->getRight();
		        }
		        
		        if(repParent==delNode)
		            //set right subtree of deleted node to replacement
		            repNode->getRight()=delNode->getRight();
		        else
		        {
		            //delete replacement Node from tree by assignming its left ptr to parents right
		            repParent->getRight()=repNode->getLeft();
		       
		            //replace delNode with repNode
		            repNode->getLeft()=delNode->getLeft();
		            repNode->getRight()=delNode->getRight();
		        }
		    }
		    //the links have now gone around the deleted node
		    
		    //deleting the root node. assign new root
		    if(parent==NULL)
		        root=repNode;
		    else if(delNode->value<parent->value)
		        parent->getLeft()=repNode;
		    else
		        parent->getRight()=repNode;
		        
		    // delete the node from memory and decrement list size
		    FreeTreeNode(delNode);
		    size--;
	  	}
	  	void ClearTree(void)
	  	{
	  		//deletes current tree or subtree
	  		DeleteTree(current)
	  		current=NULL;
	  	}
	  	int TreeEmpty(void) const
	  	{
	  		//deterimines if tree is empty
	  		if(size==0)
	  			return 1;
	  		else
	  			return 0;
	  	}
	  	int TreeSize(void) const
	  	{
	  		//return size
	  		return size;
	  	}
	  	void Update(const T& item)
	  	{
	  		//if the item is same as current value, set to current... otherwise insert item
	  		if(current!=NULL && current->value==item)
            	current->value=item;
    		else
        		Insert(item);
	  	}
	  	TreeNode *GetRoot(void) const
	  	{
	  		return root;
	  	}	
	protected:
		TreeNode <T> *root;
		TreeNode <T> *current;
		int size;
		TreeNode *GetTreeNode(T item, TreeNode *lptr = NULL, TreeNode *rptr = NULL)
		{
			//creates a new TreeNode
			TreeNode <T> *p;
			p=new TreeNode <T> (item, lptr, rptr);
			return p;
		}
	  	void FreeTreeNode(TreeNode *p)
	  	{
	  		delete p;
	  	}
	  	TreeNode *CopyTree(TreeNode *t)
	  	{
	  		 TreeNode <T> *newLeft;
	  		 TreeNode <T> *newRight;
	  		 TreeNode <T> *newNode;
   
   			 //if tree empty, return NULL
    		if(t==NULL)
        		return NULL;
        
    		//copy the left branch of t
    		if(t->getLeft()!=NULL) 
        		newLeft=CopyTree(t->getLeft());
    		else
       			newLeft=NULL;
 
    		//copy the right branch of t
    		if(t->getRight()!=NULL) 
        		newRight=CopyTree(t->getRight());
    		else
        		newRight=NULL;
 
    		//create newNode and return
    		newNode=GetTreeNode(t->value, newLeft, newRight);
    		return newNode;
	  	}
	  	void DeleteTree (TreeNode *t)
	  	{
	  		if(t!=NULL)
	  		{
	  			//traverses each side of the tree and deletes until the nodes are NULL
	  			DeleteTree(t->getLeft());
	  			DeleteTree(t->getRight());
	  			FreeTreeNode(t);
	  		}
	  		t=NULL;
	  	}
	  	TreeNode *FindNode(const T& item, TreeNode* &parent) const
	  	{
	  		current=parent;
	  		//if item is less than the parent recursive call for left branch
	  		if(item<parent->value)
	  			return FindNode(item, parent->getLeft());
	  		//if item is greate than the parent recursive call for right branch
	  		else if(item>parent->value)
	  			return FindNode(item, parent->getRight());
	  		//if it is equal, return parent
	  		else
	  			return parent;
	  	}
};

#endif
