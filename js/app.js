const videos = [
  {
    title: "JavaScript Full Course for Beginners",
    channel: "CodeCraft",
    views: "2.8M views",
    age: "8 months ago",
    duration: "3:42:18",
    category: "Coding",
    thumb: "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?auto=format&fit=crop&w=900&q=80"
  },
  {
    title: "Lo-fi Beats for Deep Study Sessions",
    channel: "Focus Room",
    views: "913K views",
    age: "2 weeks ago",
    duration: "1:12:04",
    category: "Music",
    thumb: "https://images.unsplash.com/photo-1494232410401-ad00d5433cfa?auto=format&fit=crop&w=900&q=80"
  },
  {
    title: "Building a Responsive Dashboard with HTML and CSS",
    channel: "Frontend Lab",
    views: "487K views",
    age: "1 month ago",
    duration: "24:55",
    category: "Coding",
    thumb: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=900&q=80"
  },
  {
    title: "Open World Gameplay Walkthrough",
    channel: "LevelUp",
    views: "1.4M views",
    age: "3 days ago",
    duration: "38:21",
    category: "Gaming",
    thumb: "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=900&q=80"
  },
  {
    title: "How I Plan a Productive Week",
    channel: "Study Flow",
    views: "221K views",
    age: "6 days ago",
    duration: "14:09",
    category: "Study",
    thumb: "https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&w=900&q=80"
  },
  {
    title: "Design Systems Explained in 20 Minutes",
    channel: "Pixel Method",
    views: "742K views",
    age: "4 months ago",
    duration: "20:37",
    category: "Coding",
    thumb: "https://images.unsplash.com/photo-1558655146-9f40138edfeb?auto=format&fit=crop&w=900&q=80"
  },
  {
    title: "Late Night Tech Podcast: AI, Apps, and Creators",
    channel: "Signal Talk",
    views: "118K views",
    age: "12 hours ago",
    duration: "52:18",
    category: "Podcasts",
    thumb: "https://images.unsplash.com/photo-1590602847861-f357a9332bbc?auto=format&fit=crop&w=900&q=80"
  },
  {
    title: "Live Coding a Weather App from Scratch",
    channel: "Build Stream",
    views: "36K watching",
    age: "Live now",
    duration: "LIVE",
    category: "Live",
    thumb: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=900&q=80"
  },
  {
    title: "Street Food Tour Through Tokyo",
    channel: "Roam Daily",
    views: "3.1M views",
    age: "1 year ago",
    duration: "18:42",
    category: "Travel",
    thumb: "https://images.unsplash.com/photo-1542051841857-5f90071e7989?auto=format&fit=crop&w=900&q=80"
  },
  {
    title: "Relaxing Piano Covers for Work",
    channel: "Quiet Keys",
    views: "654K views",
    age: "5 weeks ago",
    duration: "45:00",
    category: "Music",
    thumb: "https://images.unsplash.com/photo-1520523839897-bd0b52f945a0?auto=format&fit=crop&w=900&q=80"
  },
  {
    title: "Exam Revision Sprint: 90 Minute Study With Me",
    channel: "Desk Mode",
    views: "87K views",
    age: "yesterday",
    duration: "1:30:00",
    category: "Study",
    thumb: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?auto=format&fit=crop&w=900&q=80"
  },
  {
    title: "Speedrunning the Final Boss",
    channel: "Arcade Atlas",
    views: "332K views",
    age: "9 days ago",
    duration: "12:31",
    category: "Gaming",
    thumb: "https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=900&q=80"
  }
];

const videoGrid = document.querySelector("#videoGrid");
const searchForm = document.querySelector("#searchForm");
const searchInput = document.querySelector("#searchInput");
const chipButtons = document.querySelectorAll(".chip");
const sidebar = document.querySelector("#sidebar");
const modal = document.querySelector("#watchModal");
const modalTitle = document.querySelector("#modalTitle");
const modalMeta = document.querySelector("#modalMeta");

let activeCategory = "All";
let activeSearch = "";

function initials(name) {
  return name
    .split(" ")
    .map((word) => word[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

function filteredVideos() {
  const query = activeSearch.trim().toLowerCase();

  return videos.filter((video) => {
    const matchesCategory = activeCategory === "All" || video.category === activeCategory;
    const matchesSearch = !query
      || video.title.toLowerCase().includes(query)
      || video.channel.toLowerCase().includes(query)
      || video.category.toLowerCase().includes(query);

    return matchesCategory && matchesSearch;
  });
}

function renderVideos() {
  const matches = filteredVideos();

  if (!matches.length) {
    videoGrid.innerHTML = '<p class="video-meta">No videos found. Try another search.</p>';
    return;
  }

  videoGrid.innerHTML = matches.map((video, index) => `
    <button class="video-card" type="button" data-video-index="${videos.indexOf(video)}">
      <div class="thumbnail">
        <img src="${video.thumb}" alt="">
        <span class="duration">${video.duration}</span>
      </div>
      <div class="video-info">
        <div class="channel-avatar">${initials(video.channel)}</div>
        <div>
          <h2 class="video-title">${video.title}</h2>
          <p class="video-meta">${video.channel}<br>${video.views} &bull; ${video.age}</p>
        </div>
      </div>
    </button>
  `).join("");

  document.querySelectorAll(".video-card").forEach((card) => {
    card.addEventListener("click", () => openPlayer(Number(card.dataset.videoIndex)));
  });
}

function openPlayer(index) {
  const video = videos[index] || videos[0];
  modalTitle.textContent = video.title;
  modalMeta.textContent = `${video.channel} - ${video.views} - ${video.age}`;
  modal.classList.remove("hidden");
  document.body.style.overflow = "hidden";
}

function closePlayer() {
  modal.classList.add("hidden");
  document.body.style.overflow = "";
}

chipButtons.forEach((button) => {
  button.addEventListener("click", () => {
    chipButtons.forEach((chip) => chip.classList.remove("active"));
    button.classList.add("active");
    activeCategory = button.dataset.category;
    renderVideos();
  });
});

searchForm.addEventListener("submit", (event) => {
  event.preventDefault();
  activeSearch = searchInput.value;
  renderVideos();
});

searchInput.addEventListener("input", () => {
  activeSearch = searchInput.value;
  renderVideos();
});

document.querySelector("#menuToggle").addEventListener("click", () => {
  sidebar.classList.toggle("collapsed");
  document.body.classList.toggle("menu-collapsed");
});

document.querySelector("#themeToggle").addEventListener("click", () => {
  document.body.classList.toggle("dark");
});

document.querySelectorAll("[data-close-modal]").forEach((element) => {
  element.addEventListener("click", closePlayer);
});

document.querySelector("[data-featured-play]").addEventListener("click", () => openPlayer(10));

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closePlayer();
  }
});

renderVideos();
