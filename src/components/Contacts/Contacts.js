import './Contacts.scss'
const Contacts = ()=>{
    return(
        <div className='Total_Info'>
            <div className="container">
            <label>About the Project</label>
            <h4>This is a training project designed to demonstrate the capabilities of the Europeana API. It is not intended for commercial use and serves purely for educational and demonstrative purposes. Our goal is to show how modern technology can make cultural heritage accessible to everyone.</h4>
            <label>What is the Europeana API?</label>
            <h4>The Europeana API is a powerful tool that provides access to the vast Europeana database, which brings together over 50 million objects from museums, libraries, archives, and galleries across Europe. Using this API, we have created this site to make cultural heritage accessible to everyone.</h4>
            <label>What Can You Find Here?</label>
            <ul>
                <li><span>Search Collections:</span> Use our convenient search feature to find objects by keywords, themes, or time periods.</li>
                <li><span>Recommendations:</span>Discover new objects that may interest you, thanks to our recommendation system.</li>
                <li><span>Detailed Information:</span>Learn more about each object through descriptions, annotations, and metadata provided by Europeana.</li>
                <li><span>Thematic Collections:</span>Explore virtual exhibitions and curated collections based on Europeana data.</li>
            </ul>
            <label>Why Is This Important?</label>
            <h4>We believe that cultural heritage should be accessible to everyone. Thanks to the Europeana API, we can provide you with access to unique collections that tell stories of the past, inspire creativity, and help us better understand our shared history.</h4>
            </div>
        </div>
    )
}
export default Contacts;