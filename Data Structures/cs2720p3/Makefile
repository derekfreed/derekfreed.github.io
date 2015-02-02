make:
	g++ -c MergeSort.cc MergeSort.h
	g++ -c InsertionSort.cc InsertionSort.h
	g++ -o data DataGenerator.cc MergeSort.cc InsertionSort.cc
run:
	./data
clean:
	rm data
	rm InsertionSort.o
	rm MergeSort.o
	rm InsertionSort.h.gch
	rm MergeSort.h.gch
