import React from 'react'

const Dashboard = () => {
  return (
    <div id="sidebar">
      <div class="container-fluid fixed-top bg-dark shadow">
        <div class="row collapse show no-gutters d-flex h-100 position-relative">
            <div class="col-3 px-0 w-sidebar navbar-collapse collapse d-none d-md-flex">
                {/* -- spacer col -- */}
                <a href="#" class="navbar-brand">Brand</a>
            </div>
            <div class="col px-3 px-md-0 py-3">
                <div class="d-flex">
                    {/* <!-- toggler -->*/}
                    <a data-toggle="collapse" href="#" data-target=".collapse" role="button" class="">
                        <i class="fa fa-bars fa-lg"></i>
                    </a>
                    <a href="#modal" data-target="modal" data-toggle="modal" class="ml-auto text-white"><i class="fa fa-cog"></i></a>
                </div>
            </div>
        </div>
      </div>
      <div class="container-fluid px-0 h-100">
          <div class="row min-vh-100 collapse show no-gutters d-flex h-100 position-relative">
              <div class="col-3 p-0 h-100 text-white w-sidebar navbar-collapse collapse d-none d-md-flex sidebar">
                  {/* <!-- fixed sidebar --> */}
                  <div class="navbar-dark bg-dark position-fixed h-100 w-sidebar">
                      <h6 class="px-3 pt-5">Fixed Menu</h6>
                      <ul class="nav flex-column flex-nowrap text-truncate">
                          <li class="nav-item">
                              <a class="nav-link active" href="#">Active</a>
                          </li>
                          <li class="nav-item">
                              <a class="nav-link" href="#">Link</a>
                          </li>
                          <li class="nav-item">
                              <a class="nav-link" href="#">Link</a>
                          </li>
                      </ul>
                  </div>
              </div>
              <div class="col p-3">
                  <h3>Content..</h3>
                  <p>Sriracha biodiesel taxidermy organic post-ironic, Intelligentsia salvia mustache 90's code editing brunch. Butcher polaroid VHS art party, hashtag Brooklyn deep v PBR narwhal sustainable mixtape swag wolf squid tote bag. Tote bag cronut semiotics, raw denim deep v taxidermy messenger bag. Tofu YOLO Etsy, direct trade ethical Odd Future jean shorts paleo. Forage Shoreditch tousled aesthetic irony, street art organic Bushwick artisan cliche semiotics ugh synth chillwave meditation. Shabby chic lomo plaid vinyl chambray Vice. Vice sustainable cardigan, Williamsburg master cleanse hella DIY 90's blog.</p>
                  <p>Ethical Kickstarter PBR asymmetrical lo-fi. Dreamcatcher street art Carles, stumptown gluten-free Kickstarter artisan Wes Anderson wolf pug. Godard sustainable you probably haven't heard of them, vegan farm-to-table Williamsburg slow-carb readymade disrupt deep v. Meggings seitan Wes Anderson semiotics, cliche American Apparel whatever. Helvetica cray plaid, vegan brunch Banksy leggings +1 direct trade. Wayfarers codeply PBR selfies. Banh mi McSweeney's Shoreditch selfies, forage fingerstache food truck occupy YOLO Pitchfork fixie iPhone fanny pack art party Portland.</p>
              </div>
          </div>
      </div>
    </div>
  );
}

export default Dashboard;
