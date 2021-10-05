class UI {
    constructor() {
        this.loaderTestimonials = document.querySelector('.load-container')
        this.testimonialsCarousel = document.querySelector('#carouselExampleControls')
        this.testimonialsInner = document.querySelector('#testimonials.carousel-inner')
        this.loaderPopularVideos = document.querySelector('#popularVideos > .load-container')
        this.popularVideosInner = document.querySelector('#popularVideos > .carousel-inner')
        this.loaderLatestVideos = document.querySelector('#latestVideos > .load-container')
        this.latestVideosInner = document.querySelector('#latestVideos > .carousel-inner')
        this.loaderCourses = document.querySelector('#coursesContainer > .load-container')
        this.numberCourses = document.querySelector('#coursesContainer > h5')
        this.coursesList = document.querySelector('#coursesList')
        this.keywordsField = document.querySelector('#keywords')
        this.topicField = document.querySelector('#topic')
        this.sortField = document.querySelector('#sort-by')
    }

    showTestimonials(testimonials) {
        testimonials.forEach((testimonial) => {
            let carouselItem = document.createElement('div')
            carouselItem.classList.add('carousel-item')
    
            carouselItem.innerHTML = `
                <div class="carousel-content d-md-flex text-center my-5 text-md-left align-items-center justify-content-center">
                    <img src="${testimonial.pic_url}" class="rounded-circle" alt="Person carousel">
                    <blockquote class="carousel-content-text w-50 my-4 mx-auto m-md-0 ml-md-5">
                        <p class="text-white content-text">« ${testimonial.text} »</p>
                        <footer>
                            <p class="text-white font-weight-bold">${testimonial.name}</p>
                            <p class="text-white font-italic">${testimonial.title}</p>
                        </footer>
                    </blockquote>
                </div>
            `
            this.testimonialsInner.append(carouselItem)
        })
        this.testimonialsInner.children[0].classList.add('active')
        this.loaderTestimonials.classList.add('d-none')
        this.testimonialsCarousel.classList.remove('d-none')
    }

    getCard (video) {

        let card = `
            <div class="card">
                <img src="${video.thumb_url}" class="card-img-top" alt="Person card">
                <div class="video"><img src="/images/play.png" alt="play"> </div>
                <div class="card-body">
                    <p class="card-title font-weight-bold">${video.title}</p>
                    <p class="card-text text-secondary">${video['sub-title']}</p>
                    <div class="card-review mt-5">
                        <div class="card-review-img d-flex align-items-center justify-content-between">
                            <img src="${video.author_pic_url}"  class="rounded-circle" alt="Image ${video.author}">
                            <p class="text-color-main">${video.author}</p>
                        </div>
                        <div class="card-review-calification row align-items-center">
                            <div class="calification-star col-7 mt-3">
                                <img src="images/star_${video.star >= 1 ? 'on' : 'off'}.png" alt="">
                                <img src="images/star_${video.star >= 2 ? 'on' : 'off'}.png" alt="">
                                <img src="images/star_${video.star >= 3 ? 'on' : 'off'}.png" alt="">
                                <img src="images/star_${video.star >= 4 ? 'on' : 'off'}.png" alt="">
                                <img src="images/star_${video.star >= 5 ? 'on' : 'off'}.png" alt="">
                            </div>
                            <span class="col-5 text-right text-color-main mt-3">${video.duration}</span>
                        </div>
                    </div>
                </div>
            </div>
        `
        return card
    }

    createVideoCard (video) {

        let card = this.getCard(video)

        const carouselVideoItem = document.createElement('div')
        carouselVideoItem.classList.add('carousel-item')

        carouselVideoItem.innerHTML = `
        <div class="col-12 col-sm-6 col-lg-3 d-flex justify-content-center">
            <div class="mx-md-3">
                ${card}
            </div>
        </div>
        `

        return carouselVideoItem
    }

    showPopularVideos (videos) {

        videos.forEach(video => {
            this.popularVideosInner.appendChild(this.createVideoCard(video))
        })

        this.popularVideosInner.children[0].classList.add('active')
        this.loaderPopularVideos.classList.add('d-none')
        this.slideOne('popularVideos')
    }

    showLatestVideos (videos) {
        videos.forEach( video => {
            this.latestVideosInner.appendChild(this.createVideoCard(video))
        })

        this.latestVideosInner.children[0].classList.add('active')
        this.loaderLatestVideos.classList.add('d-none')
        this.slideOne('latestVideos')
    }

    showCourses (videos) {

        this.numberCourses.innerHTML = `${videos.length} results`

        videos.forEach(video => {
            let card = this.getCard(video)

            let columns = document.createElement('div')
            columns.className = 'mb-5 col-12 col-sm-6 col-md-4 col-lg-3 d-flex justify-content-center'
            columns.innerHTML = card

            this.coursesList.append(columns)
        })

        this.numberCourses.classList.remove('d-none')
        this.coursesList.classList.remove('d-none')
        this.loaderCourses.classList.add('d-none')
    }

    updateCourses (courses) {
        this.clearCourses()
        this.showCourses(courses)
    }
    
    clearCourses () {
        while (this.coursesList.firstElementChild) {
            this.coursesList.firstElementChild.remove()
        }
    }

    slideOne(id) {
        $(`#${id} .carousel-item`).each(function () {
            let minPerSlide = 4
            let next = $(this).next()
            if (!next.length) {
                next = $(this).siblings(":first")
            }
            next.children(":first-child").clone().appendTo($(this))
    
            for (let i = 0; i < minPerSlide; i++) {
                next = next.next()
                if (!next.length) {
                    next = $(this).siblings(":first")
                }
                next.children(":first-child").clone().appendTo($(this))
            }
        })
    }

}

class SmileSchool {
    async getTestimonials () {
        let data = await fetch('https://smileschool-api.hbtn.info/quotes')
        let response = await data.json()
        return response
    }

    async getPopularVideos () {
        let data = await fetch('https://smileschool-api.hbtn.info/popular-tutorials')
        let response = await data.json()
        return response
    }

    async getLatestVideos () {
        let data = await fetch('https://smileschool-api.hbtn.info/latest-videos')
        let response = await data.json()
        return response
    }

    async getCourses () {
        let data = await fetch('https://smileschool-api.hbtn.info/courses')
        let response = await data.json()
        return response
    }

    async getCoursesByFilter(keywords, topic, sortBy) {
        let res = await window.fetch(`https://smileschool-api.hbtn.info/courses?q=${keywords}&topic=${topic}&sort=${sortBy}`)
        res = await res.json()
        return res
    }
}

const App = (function () {

    let ui, smileschool

    //Determine which page user is on
    function render() {
        const view = document.querySelector('body').id

        //Instantiate UI and API controllers
        ui = new UI()
        smileschool = new SmileSchool()

        //populate page
        paint(view)
    }

    function paint(view) {
        if (view === 'homepage' || view === 'pricing') {
            //fetch testimonials from API
            smileschool.getTestimonials()
                .then( data => {
                    // show testimonials
                    ui.showTestimonials(data)
                })
        }

        //render most popular video
        if (view === 'homepage') {
            //fetch popular videos from API
            smileschool.getPopularVideos()
                .then( data => {
                    // show popular videos
                    ui.showPopularVideos(data)
                })
            //fetch Latest videos from API
            smileschool.getLatestVideos()
                .then( data => {
                    // show latest videos
                    ui.showLatestVideos(data)
                })
        }

        //render courses
        if (view === 'courses') {
            //fetch courses
            smileschool.getCourses()
                .then( data => {
                    //show courses
                    ui.showCourses(data.courses)
                })
            // Listen for changes in search/filter fields
            ui.keywordsField.addEventListener('input', filterCourses)
            ui.topicField.addEventListener('input', filterCourses)
            ui.sortField.addEventListener('input', filterCourses)
        }

    }

    function filterCourses () {
        const keywords = ui.keywordsField.value
        const topic = ui.topicField.value
        const sortBy = ui.sortField.value
    
        // Fetch matching courses from API
        smileschool.getCoursesByFilter(keywords, topic, sortBy)
            .then(data => {
                // Update display
                ui.updateCourses(data.courses)
            })
        // Get values of search/filter fields
    }

    return {render}
})()

// start rendering content on page load
document.addEventListener('load', App.render())
