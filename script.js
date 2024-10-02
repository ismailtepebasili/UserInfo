async function fetchUsers() {
  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/users");
    const users = await response.json();
    console.log(users[0].name);
    console.log(users[0].username);
    console.log(users[0].address);
    console.log(users[0].company.name);
    console.log(users[0].email);
    console.log(users[0].phone);
    console.log(users[0].website);
    displayUsers(users);
  } catch (error) {
    console.log("Hata ", error);
  }
}

function displayUsers(data) {
  const container = document.getElementById("user-cards");
  data.forEach((user) => {
    const userCardHTML = `
    <div class="col-md-12 mb-4 d-flex align-items-stretch text-center">
        <div class="card w-100">
            <div class="card-body d-flex flex-column">
                <h5 class="cart-title user-name">${user.name}</h5>
                    <div class="user-details">
                        <p class="card-text"><i class="fa-solid fa-user"></i> @${user.username}</p>
                        <p class="card-text"><i class="fa-solid fa-location-dot"></i> ${user.address.street}, ${user.address.suite}, ${user.address.zipcode}</p>
                        <p class="card-text"><i class="fa-solid fa-building"></i> ${user.company.name}</p>
                        <p class="card-text"><i class="fa-solid fa-envelope"></i> ${user.email}</p>
                        <p class="card-text"><i class="fa-solid fa-phone"></i> ${user.phone}</p>
                        <p class="card-text"><i class="fa-solid fa-globe"></i> ${user.website}</p>
                        <a href="details.html?id=${user.id}" class="btn btn-outline-dark">View Profile</a>
                    </div>
                    <div class="text-center mt-3 toggle-details">
                        <i class="fa-solid fa-arrow-down-a-z fa-2x"></i>
                    </div>
            </div>
        </div>
    </div>`;
    container.innerHTML += userCardHTML;
  });
  addToggleListeners();
}

function addToggleListeners() {
  const toggleDetails = document.querySelectorAll(".toggle-details");
  toggleDetails.forEach((item) => {
    item.addEventListener("click", function () {
      const currentDetail =
        this.closest(".card-body").querySelector(".user-details");
      const userDetails = document.querySelectorAll(".user-details");
      userDetails.forEach((detail) => {
        if (detail !== currentDetail) {
          detail.classList.remove("show");
          const icon = detail
            .closest(".card-body")
            .querySelector(".toggle-details i");
          if (icon.classList.contains("fa-arrow-up-a-z")) {
            icon.classList.remove("fa-arrow-up-a-z");
            icon.classList.add("fa-arrow-down-a-z");
          }
        }
      });

      currentDetail.classList.toggle("show");
      const icon = this.querySelector("i");
      if (icon.classList.contains("fa-arrow-down-a-z")) {
        icon.classList.remove("fa-arrow-down-a-z");
        icon.classList.add("fa-arrow-up-a-z");
      } else {
        icon.classList.remove("fa-arrow-up-a-z");
        icon.classList.add("fa-arrow-down-a-z");
      }
    });
  });
}

const searchForm = document.getElementById("searchForm");
searchForm.addEventListener("submit", function (event) {
  event.preventDefault();
  const userId = document.getElementById("searchInput").value;
  if (userId >= 1 && userId <= 10) {
    window.location.href = `details.html?id=${userId}`;
  } else {
    alert("Girdiğiniz ID 1 ile 10 arasında olmalıdır!");
  }
});

fetchUsers();
addToggleListeners();
