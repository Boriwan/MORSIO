import React from "react";
import "./About.css";
import SessionList from "../../Components/SessionList/SessionList";
import Author from '../../Components/Author/Author';
import BusModel from '../../images/Bussinesmodel.png';
import BusReq from '../../images/Businesrequest.png';
import AppModel from '../../images/ApplicationModel.png';



function About() {

  const documentationItems = [
    {
      title: 'Business Requests',
      imageUrl: BusReq, 
      link: 'https://uuapp.plus4u.net/uu-bookkit-maing01/5137c779204d4cd59cc45cf3ec57320c/book/page?code=home' 
    },
    {
      title: 'Business Model',
      imageUrl: BusModel,
      link: 'https://uuapp.plus4u.net/uu-bookkit-maing01/8524e4911a774336bb87c33168b7604a/book/page?code=home'
    },
    {
      title: 'Application Model',
      imageUrl: AppModel,
      link: 'https://uuapp.plus4u.net/uu-bookkit-maing01/314be28faddb47208c6d7db444021fff/book/page?code=home'
    }
  ];

  const authors = [
    { name: 'Stefan', surname: 'Rajilić', position: 'Frontend developer', photo: 'https://media.licdn.com/dms/image/D5603AQG_qgYqs_Xymw/profile-displayphoto-shrink_200_200/0/1669071626547?e=2147483647&v=beta&t=TgbTtBEe01oD3FfjtWeM7fDQqpKyrjctBpQAxW9wRXg' },
    { name: 'Boris', surname: 'Boček', position: 'Project manager', photo: 'https://media.licdn.com/dms/image/D4E03AQFm45cEFfOTWw/profile-displayphoto-shrink_400_400/0/1689364032433?e=2147483647&v=beta&t=OQzb_rjX__K2MCdenGF9P40S_h2eQF13nNhGOyI3-HU' },
    { name: 'Oliver', surname: 'Cavallo', position: 'Backend developer', photo: 'https://media.licdn.com/dms/image/D5603AQH2Ig8VfLHYcg/profile-displayphoto-shrink_800_800/0/1665000175123?e=2147483647&v=beta&t=qxldFiHCTZaEfBPWXN32jrxlDByNoqikTPzLaH5bVYw' },
    { name: 'Robin', surname: 'Cavallo', position: 'Frontend developer', photo: 'https://media.licdn.com/dms/image/D4E03AQE6asqscUBrTw/profile-displayphoto-shrink_200_200/0/1678394389445?e=2147483647&v=beta&t=THndtXDe3Oj9BLWSCr2P0KKtkFA3mmVhC2hdF8DEKIc' },
    { name: 'Matěj', surname: 'Žemlička', position: 'Backend developer', photo: 'https://media.licdn.com/dms/image/D4D03AQEigdHJljA3BQ/profile-displayphoto-shrink_400_400/0/1671036664896?e=2147483647&v=beta&t=DKuir6TLSGVKQ5fomczO2UcJOS23cOSeAvfzmJWbGKA' },
    { name: 'Jakub', surname: 'Stádník', position: 'Backend developer', photo: 'https://pbs.twimg.com/profile_images/1232256905445244928/ZYHE79hx_400x400.jpg' },
  ];

  return (
    <>
      <div className="session-list">
        <SessionList />
      </div>
      <div className="about-page">
        <div className="about-page-container">
          <div className="heading">
            <h1>About MORSIO</h1>
          </div>

          <section className="authors-section">
            <div className="heading">
              <h2>Authors</h2>
            </div>

            <div className="authors-cards-container">
              {authors.map((author, index) => (
                <Author
                  key={index}
                  name={author.name}
                  surname={author.surname}
                  position={author.position}
                  photo={author.photo}
                />
              ))}
            </div>
          </section>

          <section className="documentation-section">
            <div className="heading">
              <h2>Documentation</h2>
            </div>
            <div className="documentation-cards-container">
              {documentationItems.map((item, index) => (
                <a
                  key={index}
                  href={item.link}
                  className="documentation-card"
                  target="_blank" 
                  rel="noopener noreferrer" 
                >
                  <img src={item.imageUrl} alt={item.title} className="documentation-image" />
                  <p className="documentation-title">{item.title}</p>
                </a>
              ))}
            </div>
          </section>

          <section className="technologies-section">
            <div className="heading">
              <h2>Technologies Used</h2>

            </div>
            <div className="technologies-logos-container">
              

              <div className="rowContainer">
                <div className="technology-logo">
                  <span>React</span>
                  <img src="https://cdn4.iconfinder.com/data/icons/logos-3/600/React.js_logo-512.png">
                  </img>
                </div>
                <div className="technology-logo">
                  <span>Express</span>
                  <img src="https://ajeetchaulagain.com/static/7cb4af597964b0911fe71cb2f8148d64/87351/express-js.png"></img>
                </div>
                <div className="technology-logo">
                  <span>Node RED</span>
                  <img src="https://nodered.org/about/resources/media/node-red-icon-2.svg"></img>
                </div>
              </div>
              <div className="rowContainer">
                <div className="technology-logo">
                  <span>MongoDB</span>
                  <img src="https://www.pngall.com/wp-content/uploads/13/Mongodb-PNG-Image-HD.png"></img>
                </div>
                <div className="technology-logo">
                  <span>Azure</span>
                  <img src="https://seeklogo.com/images/M/microsoft-azure-logo-85055C44BE-seeklogo.com.png"></img>
                </div>
                <div className="technology-logo">
                  <span>Hardwario Code</span>
                  <img src="https://images.g2crowd.com/uploads/product/image/social_landscape/social_landscape_a56fba217478830ebc0d7f33ee162d25/hardwario.png"></img>
                </div>
              </div>
            </div>
          </section>

          <div className="about-page-footer">
            <p>Morsio ver. 1.0</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default About;
