import './style.css';
// function Quizes() {
//     return ( 
//         <h2>Quizes</h2>
        
//      );
     
// }

// export default Quizes;


// import AccordionWrapper from './components/AccordionWrapper';
// import AccordionItem from './components/AccordionItem';

import AccordionWrapper from "../../components/AccordionWrapper";
import AccordionItem from "../../components/AccordionItem";


function Quizzes() {

  const data = [
    {
      "title": "Completed Quizzes",
      "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus a consequat nibh. Mauris suscipit arcu at fermentum convallis. Pellentesque consectetur mi in felis maximus posuere."
    },
    {
      "title": "Pending Quizzes",
      "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In molestie tellus a maximus tempus. Duis vel leo iaculis, porttitor erat et, posuere erat. Ut blandit."
    },
    {
      "title": "Test",
      "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas lacinia, nibh imperdiet tempus pharetra, arcu risus aliquet arcu, a auctor ex lacus efficitur purus. Morbi."
    },
    {
      "title": "Testing",
      "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc feugiat lobortis nibh, eu molestie est placerat non. Donec ornare nisl erat, non imperdiet elit porta."
    }
  ];

  return (
    <div className="App">
      <div className="content">
        <div className="app-description">
          <h1>Quizzes</h1>
          <p>View your Completed and Pending Quizzes</p>
        </div>
          <AccordionWrapper>
            {data.map((item, index) => (
              <AccordionItem key={index} index={index} title={item.title} description={item.description} />
            ))}
          </AccordionWrapper>
      </div>
    </div>
  );
}

export default Quizzes;
