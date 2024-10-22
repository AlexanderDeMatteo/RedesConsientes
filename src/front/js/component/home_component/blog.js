import React from "react";


export const Blog = () =>{
    return(
        <section className="section" id="blog">
        <div className="container">
            {/* ***** Section Title Start ***** */}
            <div className="row">
                <div className="col-lg-12">
                    <div className="center-heading">
                        <h2 className="section-title">Blog Entries</h2>
                    </div>
                </div>
                <div className="offset-lg-3 col-lg-6">
                    <div className="center-text">
                        <p>Integer molestie aliquam gravida. Nullam nec arcu finibus, imperdiet nulla vitae, placerat nibh. Cras maximus venenatis molestie.</p>
                    </div>
                </div>
            </div>
            {/* ***** Section Title End ***** */}

            <div className="row">
                <div className="col-lg-4 col-md-6 col-sm-12">
                    <div className="blog-post-thumb">
                        <div className="img">
                            <img src="assets/images/blog-item-01.png" alt=""/>
                        </div>
                        <div className="blog-content">
                            <h3>
                                <a href="#">Vivamus ac vehicula dui</a>
                            </h3>
                            <div className="text">
                               Cras aliquet ligula dui, vitae fermentum velit tincidunt id. Praesent eu finibus nunc. Nulla in sagittis eros. Aliquam egestas augue.
                            </div>
                            <a href="#" className="main-button">Read More</a>
                        </div>
                    </div>
                </div>
                <div className="col-lg-4 col-md-6 col-sm-12">
                    <div className="blog-post-thumb">
                        <div className="img">
                            <img src="assets/images/blog-item-02.png" alt=""/>
                        </div>
                        <div className="blog-content">
                            <h3>
                                <a href="#">Phasellus convallis augue</a>
                            </h3>
                            <div className="text">
                                Aliquam commodo ornare nisl, et scelerisque nisl dignissim ac. Vestibulum finibus urna ut velit venenatis, vel ultrices sapien mattis.
                            </div>
                            <a href="#" className="main-button">Read More</a>
                        </div>
                    </div>
                </div>
                <div className="col-lg-4 col-md-6 col-sm-12">
                    <div className="blog-post-thumb">
                        <div className="img">
                            <img src="assets/images/blog-item-03.png" alt=""/>
                        </div>
                        <div className="blog-content">
                            <h3>
                                <a href="#">Nam gravida purus non</a>
                            </h3>
                            <div className="text">
                                Maecenas eu erat vitae dui convallis consequat vel gravida nulla. Vestibulum finibus euismod odio, ut tempus enim varius eu.
                            </div>
                            <a href="#" className="main-button">Read More</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
    )
}