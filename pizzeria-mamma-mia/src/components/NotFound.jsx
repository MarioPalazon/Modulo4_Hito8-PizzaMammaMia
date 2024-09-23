import React from 'react'
import { Link } from 'react-router-dom'

const Notfound = () => {
  return (
    <div className='container w-50 text-center'>
      <section className="section_register py-5 mb-5">
          <article className="article_register my-5">
              <h1 className="register_title mb-3 text-danger">ERROR 404 PAGE NOT FOUND</h1>
              <div className="register_container mb-5">
                  <Link to="/" className="btn btn-danger">Volver a Home</Link>
              </div>
          </article>
      </section>
  </div>
  )
}

export default Notfound
