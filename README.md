# CodeShard: browser based collaborative code editor

## Local Setup

1. Clone the repository into your system.

```bash
git clone https://github.com/MridulDhiman/code-shard.git
```

2. Install `pnpm` as a package manager globally in your systems, if you haven't installed it yet using this command: 

```bash
npm install -g pnpm
```

3. Install all packages and dev dependencies for your project.

```bash
pnpm install
```

4. Setup environment variables inside of `.env.local` file.

```bash

## Replace with your values
AUTH_SECRET="<random-hash-value>"
MONGODB_URI="<your-mongodb-url-here>"
HOST_URL="http://localhost:3000"
NEXT_PUBLIC_BACKEND_URL="http://localhost:8080"
```

## Overview

It is browser based collaborative code editor with built-in frontend templates support like React, Svelte, Vue, Angular, Solid etc. Each template provides multi-file support, and you can add new files, dependencies and dev dependencies. It executes the code within the browser itself, inside a separate iframe. User can Signup/Login using email and password. Even without login, one can try out all the editors and their code state would be saved permanently, even after closing the tab. After successful login, you can create new shards/playgrounds in your account, and it would be visible in your profile. You can change the visibility of particular shard from Public to Private and vice versa. User can like each other's posts and comment on them, and follow each other. Personalized Comment Thread for each post. User have a personalized github like feed, where he/she can she all the activities of the users he/she have followed. User can create collaborative rooms and shard room id, and they can collaborative on multiple files at the same time, without worrying about write conflicts, as they get synchronized automatically by CRDTs. For persisting the data inside of room, all the realtime code updates, are batched inside of Kafka, and kafka consumer picks up the latest event and saves that data to database after every 10s (can be optimized).


## Demo


<div class="carousel">
    <div class="carousel-images">
        <div class="carousel-item active">
            <img src="images/image-10.png" alt="Image 1">
        </div>
        <div class="carousel-item">
            <img src="images/shard.png" alt="Image 2">
        </div>
        <div class="carousel-item">
            <img src="images/image-3.png" alt="Image 3">
        </div>
        <div class="carousel-item">
            <img src="images/image-4.png" alt="Image 4">
        </div>
        <div class="carousel-item">
            <img src="images/image-5.png" alt="Image 5">
        </div>
        <div class="carousel-item">
            <img src="images/image-7.png" alt="Image 6">
        </div>
        <div class="carousel-item">
            <img src="images/image-8.png" alt="Image 7">
        </div>
        <div class="carousel-item">
            <img src="images/image-9.png" alt="Image 8">
        </div>
    </div>
    <button class="prev" onclick="moveSlide(-1)">&#10094;</button>
    <button class="next" onclick="moveSlide(1)">&#10095;</button>
</div>

<style>
.carousel {
    position: relative;
    max-width: 600px; /* Adjust as needed */
    margin: auto;
    border-radius: 10px; /* Rounded corners */
    overflow: hidden;
    /* border: 1px solid white; */
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* Subtle shadow for depth */
}

.carousel-images {
    display: flex;
    transition: transform 0.5s ease;
}

.carousel-item {
    min-width: 100%; /* Show one image at a time */
    display: flex; /* Use flexbox for centering */
    justify-content: center; /* Center horizontally */
    align-items: center; /* Center vertically */
}

.carousel-item img {
    width: 100%; /* Full width of the container */
    height: auto; /* Maintain aspect ratio */
    object-fit: cover; /* Cover the entire area while maintaining aspect ratio */
    border-radius: 10px; /* Rounded corners for images */
}

button {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    background-color: rgba(255, 255, 255, 0.8);
    border: none;
    cursor: pointer;
    padding: 10px;
    border-radius: 5px; /* Rounded button corners */
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2); /* Button shadow */
}

.prev {
    left: 10px;
}

.next {
    right: 10px;
}

/* Optional hover effect for buttons */
button:hover {
    background-color: rgba(255, 255, 255, 1);
}
</style>


<script>
let currentSlide = 0;

// Get all slides
const slides = document.querySelectorAll('.carousel-item');
const totalSlides = slides.length;

function moveSlide(direction) {
    // Remove active class from current slide
    slides[currentSlide].classList.remove('active');

    // Update current slide index using modulo for wrapping
    currentSlide = (currentSlide + direction + totalSlides) % totalSlides;

    // Add active class to the new current slide
    slides[currentSlide].classList.add('active');
    
    // Update the transform property to show the current slide
    const offset = -currentSlide * 100; // Move the slide
    document.querySelector('.carousel-images').style.transform = `translateX(${offset}%)`;
}

// Initialize by showing the first slide
slides[currentSlide].classList.add('active');
</script>


