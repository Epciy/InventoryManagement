<!-- CONTENT -->
<section id="content">
  <!-- NAVBAR -->
  <nav>
    <i (click)="addToggle()" class='bx bx-menu' ></i>
    <a href="#" class="nav-link">Categories</a>
    <form action="#">
      <div class="form-input">
        <input type="search" placeholder="Search...">
        <button type="button" class="search-btn"><i class='bx bx-search' ></i></button>
      </div>
    </form>
    <a href="#" class="notification">
      <i class='bx bxs-bell' ></i>
      <span class="num">8</span>
    </a>
    <a href="#" class="profile">
      <img src="https://secure.gravatar.com/avatar/d09eaad01aea86c51b4f892b4f8abf6f?s=100&d=wavatar&r=g">
    </a>
  </nav>
  <!-- NAVBAR -->

  <!-- MAIN -->
  <main>
    <div class="head-title">
      <div class="left">
        <h1>Dashboard</h1>
        <ul class="breadcrumb">
          <li>
            <a href="#">Dashboard</a>
          </li>
          <li><i class='bx bx-chevron-right' ></i></li>
          <li>
            <a class="active" href="#">Home</a>
          </li>
        </ul>
      </div>
      <a href="#" class="btn-download">
        <i class='bx bxs-cloud-download' ></i>
        <span class="text">Download PDF</span>
      </a>
    </div>

    <ul class="box-info">
      <li>
        <i class='bx bxs-calendar-check' ></i>
        <span class="text">
          <h3>18</h3>
          <p>Membre</p>
        </span>
      </li>
      <li>
        <i class='bx bxs-group' ></i>
        <span class="text">
          <h3>5</h3>
          <p>organisme</p>
        </span>
      </li>
      <li>
        <i class='bx bxs-dollar-circle' ></i>
        <span class="text">
          <h3>2543</h3>
          <p>Materiel</p>
        </span>
      </li>
    </ul>


    <div class="table-data">
      <div class="order">
        <div class="head">
          <h3>Recent Orders</h3>
          <i class='bx bx-search' ></i>
          <i class='bx bx-filter' ></i>
        </div>
        <table>
          <thead>
            <tr>
              <th>User</th>
              <th>Date Order</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <img src="https://secure.gravatar.com/avatar/d09eaad01aea86c51b4f892b4f8abf6f?s=100&d=wavatar&r=g">
                <p>John Doe</p>
              </td>
              <td>01-10-2023</td>
              <td><span class="status completed">Completed</span></td>
            </tr>
            <tr>
              <td>
                <img src="https://secure.gravatar.com/avatar/d09eaad01aea86c51b4f892b4f8abf6f?s=100&d=wavatar&r=g">
                <p>John Doe</p>
              </td>
              <td>01-10-2023</td>
              <td><span class="status pending">Pending</span></td>
            </tr>
            <tr>
              <td>
                <img src="https://secure.gravatar.com/avatar/d09eaad01aea86c51b4f892b4f8abf6f?s=100&d=wavatar&r=g">
                <p>John Doe</p>
              </td>
              <td>01-10-2023</td>
              <td><span class="status process">Process</span></td>
            </tr>
            <tr>
              <td>
                <img src="https://secure.gravatar.com/avatar/d09eaad01aea86c51b4f892b4f8abf6f?s=100&d=wavatar&r=g">
                <p>John Doe</p>
              </td>
              <td>01-10-2023</td>
              <td><span class="status pending">Pending</span></td>
            </tr>
            <tr>
              <td>
                <img src="https://secure.gravatar.com/avatar/d09eaad01aea86c51b4f892b4f8abf6f?s=100&d=wavatar&r=g">
                <p>John Doe</p>
              </td>
              <td>01-10-2023</td>
              <td><span class="status completed">Completed</span></td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="todo">
        <div class="head">
          <h3>Todos</h3>
          <i class='bx bx-plus' ></i>
          <i class='bx bx-filter' ></i>
        </div>
        <ul class="todo-list">
          <li class="completed">
            <p>Todo List</p>
            <i class='bx bx-dots-vertical-rounded' ></i>
          </li>
          <li class="completed">
            <p>Todo List</p>
            <i class='bx bx-dots-vertical-rounded' ></i>
          </li>
          <li class="not-completed">
            <p>Todo List</p>
            <i class='bx bx-dots-vertical-rounded' ></i>
          </li>
          <li class="completed">
            <p>Todo List</p>
            <i class='bx bx-dots-vertical-rounded' ></i>
          </li>
          <li class="not-completed">
            <p>Todo List</p>
            <i class='bx bx-dots-vertical-rounded' ></i>
          </li>
        </ul>
      </div>
    </div>
  </main>
  <!-- MAIN -->
</section>
<!-- CONTENT -->