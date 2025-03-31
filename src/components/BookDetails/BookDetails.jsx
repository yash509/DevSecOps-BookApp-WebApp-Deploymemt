import React, { useEffect, useState } from 'react';
import { FaArrowLeft } from 'react-icons/fa';
import { useNavigate, useParams } from 'react-router-dom';
import coverImg from '../../images/cover_not_found.jpg';
import Loading from '../Loader/Loader';
import './BookDetails.css';

// Import your images
import inakiImg from '../../images/inaki-del-olmo-NIJuEQw0RKg-unsplash.jpg';
import istockImg1 from '../../images/istockphoto-1805651010-1024x1024.jpg';
import istockImg2 from '../../images/istockphoto-1899286477-1024x1024.jpg';
import istockImg3 from '../../images/istockphoto-2030353260-1024x1024.jpg';
import istockImg4 from '../../images/istockphoto-534576243-1024x1024.jpg';
import istockImg5 from '../../images/istockphoto-871461580-1024x1024.jpg';
import libImg from '../../images/lib.jpeg';
import libraryImg from '../../images/library-img.jpg';

const BookDetails = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [book, setBook] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    async function getBookDetails() {
      try {
        const response = await fetch(`${URL}${id}.json`);
        const data = await response.json();

        if (data) {
          const {
            description,
            title,
            covers,
            subject_places,
            subject_times,
            subjects,
          } = data;

          const newBook = {
            description: description ? description.value : 'No description found',
            title: title,
            cover_imgs: covers
              ? covers.map(cover => `https://covers.openlibrary.org/b/id/${cover}-L.jpg`)
              : [coverImg],
            subject_places: subject_places ? subject_places.join(', ') : 'No subject places found',
            subject_times: subject_times ? subject_times.join(', ') : 'No subject times found',
            subjects: subjects ? subjects.join(', ') : 'No subjects found',
          };
          setBook(newBook);
        } else {
          setBook(null);
        }
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    }
    getBookDetails();
  }, [id]);

  if (loading) return <Loading />;

  // Array of additional images
  const additionalImages = [
    inakiImg,
    istockImg1,
    istockImg2,
    istockImg3,
    istockImg4,
    istockImg5,
    libImg,
    libraryImg,
  ];

  return (
    <section className='book-details'>
      <div className='container'>
        <button
          type='button'
          className='flex flex-c back-btn'
          onClick={() => navigate('/dashboard/book')}
        >
          <FaArrowLeft size={22} />
          <span className='fs-18 fw-6'>Go Back</span>
        </button>

        <div className='book-details-content grid'>
          <div className='book-details-img'>
            {book?.cover_imgs.map((img, index) => (
              <img key={index} src={img} alt={`Cover img ${index + 1}`} />
            ))}
            {/* Display additional images */}
            {additionalImages.map((img, index) => (
              <img key={`additional-${index}`} src={img} alt={`Additional img ${index + 1}`} />
            ))}
          </div>
          <div className='book-details-info'>
            <div className='book-details-item title'>
              <span className='fw-6 fs-24'>{book?.title}</span>
            </div>
            <div className='book-details-item description'>
              <span>{book?.description}</span>
            </div>
            <div className='book-details-item'>
              <span className='fw-6'>Subject Places: </span>
              <span className='text-italic'>{book?.subject_places}</span>
            </div>
            <div className='book-details-item'>
              <span className='fw-6'>Subject Times: </span>
              <span className='text-italic'>{book?.subject_times}</span>
            </div>
            <div className='book-details-item'>
              <span className='fw-6'>Subjects: </span>
              <span>{book?.subjects}</span>
            </div>
            <div className='read'>
              {/* Add your buttons here */}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BookDetails;