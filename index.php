<?php
  session_start();
  require_once('header.php');
?>
<nav class="navbar navbar-expand-md navbar-dark fixed-top">
  <img id="logo" alt="" width="100" title="">
</nav>
<main role="main">
  <section>
    <div class="container">
      <div class="row">
        <div class="col-md-7">
        <h2>Account Info</h2>
        <app-controller></app-controller>

        <h2>Your Sale Representative</h2>
        <table class="sales_rep_info">
          <tbody>
            <tr>
              <th>Name:</th>
              <td></td>
            </tr>
            <tr>
              <th>Email:</th>
              <td><a href="" class="link no-decoration"></a></td>
            </tr>
            <tr>
              <th>Phone:</th>
              <td><a href="tel:1234567890" class="link no-decoration">(123) 456 7890</td>
            </tr>
          </tbody>
        </table>
      </div><!--/ .col-lg-7 -->
      <div class="col-md-5">
        <map-controller id="map"></map-controller>
      </div>
    </div><!--/ .row -->
  </div><!--/ .container -->
</section>
<hr class="style-one">
<section>
  <div class="container">
    <div class="row">
      <div class="col-md-7">
        <h3>Booking Options</h3>

        <form class="inline" action="" method="post" role="form" novalidate autocomplete="off">
          <div class="second-user">
            <label class="inline-label" for="option">{{}}</label>
            <input type="radio" class="form-inline" name="option" value="">
            <label class="inline-label">Choose Option</label>
          </div>
        </form>

        <table border="0" cellspacing="0" cellpadding="0" align="center" class="inline">
          <tbody class="booking">
            <tr>
              <th class="description">Description</th>
              <td id="description_text">Deluxe Motorcoach Service as shown above, includes all fee's and gratuity</td>
            </tr>
            <tr>
              <th class="quantity">Quantity</th>
              <td id="quantity_text"></td>
            </tr>
            <tr>
              <th class="price">Price</th>
              <td id="price_text"></td>
            </tr>
            <tr>
              <th class="amount">Amount</th>
              <td id="amount_text"></td>
            </tr>
          </tbody>
          <tr><td class="line"></td></tr>
          <tbody class="total" onloadedmetadata="">
            <tr>
              <th class="">Grand Total:</th>
              <td class=""></td>
            </tr>
            <tr>
              <th class="">Booking Deposit:</th>
              <td class=""></td>
            </tr>
          </tbody>
        </table>

        <form class="" action="" method="post" role="form" novalidate autocomplete="off">
          <div class="second-user">
            <label class="inline-label" for="option">{{}}</label>
            <input type="radio" class="form-inline" name="option" value="">
            <label class="inline-label">Choose Option</label>
          </div>
        </form>
        <table border="0" cellspacing="0" cellpadding="0" align="center" class="inline">
          <tbody class="booking" onloadedmetadata="" >
            <tr>
              <th data-col="" class="description">Description</th>
              <td id="description_text">Deluxe Motorcoach Service as shown above, includes all fee's and gratuity</td>
            </tr>
            <tr>
              <th class="quantity">Quantity</th>
              <td id="quantity_text"></td>
            </tr>
            <tr>
              <th class="price">Price</th>
              <td id="price_text"></td>
            </tr>
            <tr>
              <th data-col="" class="amount">Amount</th>
              <td id="amount_text">$9,295.00</td>
            </tr>
          </tbody>
          <tr><td class="line"></td></tr>
          <tbody class="total" onloadedmetadata="">
            <tr>
              <th class="">Grand Total:</th>
              <td class=""></td>
            </tr>
            <tr>
              <th class="">Booking Deposit:</th>
              <td class=""></td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="col-md-5">
        <h3>Itinerary Summary</h3>
        <itinerary-controller></itinerary-controller>
      </div><!--/ .col-md-5 -->
    </div><!--/ .row -->
  </div>
</section>
<hr class="style-one">
<section>
  <div class="container">
    <div class="row">
      <div class="col-md-12">
        <h3>Service Contract</h3>

          <button type="button" class="btn btn-red caps" name="Accept">Accept</button>
      </div>
    </div><!--/ .row -->
  </div>
</section>
</main>
<?php require_once('footer.php'); ?>
