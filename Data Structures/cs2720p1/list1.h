/*Derek Freed's Doubly Linked List
 *Project 1
 *CSCI2720
 *Tiangming Liu
 */
#ifndef LIST1_H
#define LIST1_H
#include <iostream>
#include <new>
#include "node.h"
using namespace std;

//this class is a template so you can use it with any data type
template <class T> class DLL
{
	//this is for the use of Node in this class
 	friend class Node <T>;
	
	public:
		//constructor
		DLL()
		{
			header=NULL;
			tail=NULL;
			length=0;
		}
		//deconstructor
		~DLL()
		{
         		Node <T> *current=header;
         		Node <T> *temp;
         		while(current!=NULL)
         		{
         			temp=current;
         			current=temp->next;
         			delete temp;
         		}
		}
		//returns 1 if empty, 0 if not
		int IsEmpty() const
		{
			if(length==0)
				return 1;
			else
				return 0;
		}
		//return length of DLL
		int Length() const
		{
			return length;
		}
		//pushes a new node onto the front as the new header
		void Push_front(const T &v)
		{
			Node <T> *newNode=new Node<T>(v);			//load value into a new Node
			if(IsEmpty())						//if the list is empty, then the new Node is the header and tail
			{
				header=newNode;
				tail=newNode;
			}
			else							//otherwise make the new Node the header
			{
				newNode->next=header;
				header->prev=newNode;
				header=newNode;
			}
			length++;
		}
		//pushes a new node onto the back as the new tail
		void Push_back(const T &v)
		{
			Node <T> *newNode=new Node<T>(v);			//load value into a new Node
			if(IsEmpty())						//if the list is empty, then the new Node is the header and tail
			{
				header=newNode;
				tail=newNode;
			}
			else							//otherwise make the new Node the tail
			{
				newNode->prev=tail;
				tail->next=newNode;
				tail=newNode;
			}
			length++;
		}
		//deletes the header
		void Pop_front()
		{
			if(!IsEmpty())
			{
				Node <T> *temp=header;					
				if(header==tail)				//special case if the list only has one Node, make tail and header NULL
				{
					tail=NULL;
					header=tail;
				}
				else	
				{	
					header=temp->next;					
					header->prev=NULL;					
				}
				delete temp;
				length--;
			}
		}
		//deletes tail
		void Pop_back()
		{
			if(!IsEmpty())
			{
				
				Node <T> *temp=tail;					
				if(header==tail)				//special case if the list only has one Node, make tail and header NULL
				{
					tail=NULL;
					header=tail;
				}
				else
				{
					tail=temp->prev;					
					tail->next=NULL;					
				}
				delete temp;
				length--;
			}
		}
		//returns value of header
		const T Front() const
		{
			return header->value;
		}
		//returns value of tail
		const T Back() const
		{
			return tail->value;
		}
		//print the values of the DLL front to back
		void Print() const
		{
			Node <T> *current=header;
         		Node <T> *temp;
         		while(current!=NULL)					//iterates starting from header
         		{
         			temp=current;
         			current=temp->next;
         			cout<< temp->value<<" ";
         		}
			cout<<""<<endl;
		}
		//print the values of the DLL back to front
		void PrintBack() const
		{
			Node <T> *current=tail;
         		Node <T> *temp;	
         		while(current!=NULL)					//iterates starting from tail					
         		{
         			temp=current;
         			current=temp->prev;
         			cout<< temp->value<<" ";
         		}
			cout<<""<<endl;
		}
		//visit each node and apply a function to the value
		void Iterate(void (*func)(T &))
		{
			Node <T> *current=header;
         		Node <T> *temp;
         		while(current!=NULL)					//iterates starting from header
         		{
         			temp=current;
         			current=temp->next;
         			(*func)(temp->value);				//applies the given function on the current Node's value
         		}
         	}
		//reverse the contents of the DLL
		void Reverse()
		{
			Node <T> *current=header;
         		Node <T> *temp;
         		while(current!=NULL)					//iterates starting at header and inverts all the links
         		{
         			temp=current->next;
         			current->next=current->prev;
         			current->prev=temp;
         			if(temp==NULL)
				{
					tail=header;
 		        		header=current;
				}
				current=temp;
         		}
		}
		
	private:
		Node <T> *header;		//first node
		Node <T> *tail;			//last node
		int length;
};

#endif
