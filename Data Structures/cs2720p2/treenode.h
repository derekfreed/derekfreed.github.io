//Derek Freed
//treenode.h
//10/28/2014
//TreeNode Class used for individual nodes in Binary Search Tree class
#ifndef TREENODE_H
#define TREENODE_H

#include <new>
#include "bstree.h"

template <class T> class TreeNode
{
 	friend class BinSTree <T>;
	
	public:
	  T value;
    TreeNode(const T &v, TreeNode *lt, TreeNode *rt): left(lt), value(v), right(rt) { }
   	~TreeNode() { }
   	TreeNode *getLeft() const
   	{
   		return left;
   	}
   	TreeNode *getRight() const
   	{
   		return right;
   	}

 	private:
    TreeNode <T> *left;
    TreeNode <T> *right;	
};

#endif