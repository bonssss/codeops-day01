import React from 'react'
import Card from './Card';
const courses = [
  {
    id: 1,
    title: "Course 1",
    description: "Description for Course 1",
    price: "$19.99",
  },
  {
    id: 2,
    title: "Course 2",
    description: "Description for Course 2",
    price: "$29.99",
  },
  {
    id: 3,
    title: "Course 3",
    description: "Description for Course 3",
    price: "$39.99",
  },
  {
    id: 4,
    title: "Course 4",
    description: "Description for Course 4",
    price: "$49.99",
  },
  {
    id: 5,
    title: "Course 5",
    description: "Description for Course 5",
    price: "$59.99",
  },
  {
    id: 6,
    title: "Course 6",
    description: "Description for Course 6",
    price: "$69.99",
  },
  {
    id: 7,
    title: "Course 7",
    description: "Description for Course 7",
    price: "$79.99",
  },
  {
    id: 8,
    title: "Course 8",
    description: "Description for Course 8",
    price: "$89.99",
  },
  {
    id: 9,
    title: "Course 9",
    description: "Description for Course 9",
    price: "$99.99",
  },
  {
    id: 10,
    title: "Course 10",
    description: "Description for Course 10",
    price: "$109.99",
  },
  {
    id: 11,
    title: "Course 11",
    description: "Description for Course 11",
  },
  {
    id: 12,
    title: "Course 12",
    description: "Description for Course 12",
    price: "$129.99",
  },
];
 
function Main() {
  return (
    <div className='main'>

        {courses.map((course)=>(
            <Card key={course.id}{
                ...course
            } >
            </Card>
        ))}
        
    </div>
  )
}

export default Main