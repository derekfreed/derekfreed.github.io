#include <iostream.h>
#include <fstream.h>
#include <stdlib.h>

#include "bstree.h"          // include  BinSTree class
#include "treeprnt.h"        // for Inorder scan
#include "treescan.h"       
#include "strclass.h"
#include "node.h"
#include "treelib.h"
#include "stack.h"

//found from test6.cc
int
isOperand(char c){
	if ( ((c >= 'a') && (c <= 'z'))  || ((c >= 'A') && (c <= 'Z')) )
		return true;
	else
		return false;
}
//found from test6.cc
TreeNode<char> *BuildExpTree(char * &exp)
{
	char op1, op2;
   	TreeNode<char> *lc, *rc, *op;
   	Stack<char> s1;
   	Stack<TreeNode<char> *> s2;
   	int count = 0;
	
  	while (exp[count])
  	{
    	count++;
    	s1.Push(exp[count]);
   	}
    s1.Pop();

  	while (!(s1.StackEmpty())) 
  	{
		if (isOperand(s1.Peek()))
			s2.Push(GetTreeNode(s1.Pop()));
		else
			s2.Push(GetTreeNode(s1.Pop(),s2.Pop(),s2.Pop()));
	}

 return s2.Pop();
}
//found from test6.cc 
void PrintChar(char& item)
{
	cout << item << " ";
}
//found from test6.cc
void PrintInfixExpr(TreeNode<char> *t)
{
	if (isOperand(t->data))
		cout << t->data ;
	else
	{
		cout << "(";
		PrintInfixExpr(t->Left());
		cout << t->data;
		PrintInfixExpr(t->Right());
		cout << ")";
	}
}

int
main(int argc, char argv[])
{
    
    // declare a tree of Word objects read from stream fin
    ifstream fin;
    TreeNode<char> *t;
 
    String s;
    
    
    // open the file "expr.txt"
    fin.open("expr.txt", ios::in | ios::nocreate);
    if (!fin)
    {
        cerr << "Cannot open \"expr.txt\"\n";
        exit(1);
    }


    // test BuildExpTree, PrintVTree and display infix and postfix forms
    while(fin >> s)
    {
	cout << "The prefix representation retrieved from the file : " << endl;
	cout << s << endl << endl;
	//for each string in the file
        // build the tree 
	t = BuildExpTree(s);

        // print the tree 
	cout << "The Vertical Tree representation: " << endl;
	PrintVTree(t, 2, 60);

	//skip some space
	cout << endl << endl << endl;

	//Infix display
	cout << "The Infix representation: " << endl;
	PrintInfixExpr(t);
	cout << endl << endl << endl;

	//Postfix display
	cout << "The Postfix representation: " << endl;
	Postorder(t, PrintChar);
	cout << endl << endl << endl;
    }
       

    // test BinSTree functions

	BinSTree<int>  mySTree;

	mySTree.Insert(16);
	mySTree.Insert(10);
	mySTree.Insert(5);
	mySTree.Insert(15);
	mySTree.Insert(20);
	mySTree.Insert(12);
	mySTree.Insert(17);
	mySTree.Insert(14);
	mySTree.Insert(17);
	mySTree.Insert(12);
	mySTree.Insert(25);
	mySTree.Insert(22);
	mySTree.Insert(28);

	cout << "mySTree after inserting " << endl;
	PrintVTree(mySTree.GetRoot(),5,60);
        cout << endl << endl;

	mySTree.Delete(12);

	cout << "mySTree after delete 12" << endl;
	PrintVTree(mySTree.GetRoot(),5,60);
        cout << endl << endl;
	
 
}


