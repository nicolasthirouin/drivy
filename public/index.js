'use strict';

//list of cars
//useful for ALL exercises
var cars = [{
  'id': 'p306',
  'vehicule': 'peugeot 306',
  'pricePerDay': 20,
  'pricePerKm': 0.10
}, {
  'id': 'rr-sport',
  'pricePerDay': 60,
  'pricePerKm': 0.30
}, {
  'id': 'p-boxster',
  'pricePerDay': 100,
  'pricePerKm': 0.45
}];

//list of rentals
//useful for ALL exercises
//The `price` is updated from exercice 1
//The `commission` is updated from exercice 3
//The `options` is useful from exercice 4
var rentals = [{
  'id': '1-pb-92',
  'driver': {
    'firstName': 'Paul',
    'lastName': 'Bismuth'
  },
  'carId': 'p306',
  'pickupDate': '2016-01-02',
  'returnDate': '2016-01-02',
  'distance': 100,
  'options': {
    'deductibleReduction': false
  },
  'price': 0,
  'commission': {
    'insurance': 0,
    'assistance': 0,
    'drivy': 0
  }
}, {
  'id': '2-rs-92',
  'driver': {
    'firstName': 'Rebecca',
    'lastName': 'Solanas'
  },
  'carId': 'rr-sport',
  'pickupDate': '2016-01-05',
  'returnDate': '2016-01-09',
  'distance': 300,
  'options': {
    'deductibleReduction': true
  },
  'price': 0,
  'commission': {
    'insurance': 0,
    'assistance': 0,
    'drivy': 0
  }
}, {
  'id': '3-sa-92',
  'driver': {
    'firstName': ' Sami',
    'lastName': 'Ameziane'
  },
  'carId': 'p-boxster',
  'pickupDate': '2015-12-01',
  'returnDate': '2015-12-15',
  'distance': 1000,
  'options': {
    'deductibleReduction': true
  },
  'price': 0,
  'commission': {
    'insurance': 0,
    'assistance': 0,
    'drivy': 0
  }
}];

//list of actors for payment
//useful from exercise 5
var actors = [{
  'rentalId': '1-pb-92',
  'payment': [{
    'who': 'driver',
    'type': 'debit',
    'amount': 0
  }, {
    'who': 'owner',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'insurance',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'assistance',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'drivy',
    'type': 'credit',
    'amount': 0
  }]
}, {
  'rentalId': '2-rs-92',
  'payment': [{
    'who': 'driver',
    'type': 'debit',
    'amount': 0
  }, {
    'who': 'owner',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'insurance',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'assistance',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'drivy',
    'type': 'credit',
    'amount': 0
  }]
}, {
  'rentalId': '3-sa-92',
  'payment': [{
    'who': 'driver',
    'type': 'debit',
    'amount': 0
  }, {
    'who': 'owner',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'insurance',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'assistance',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'drivy',
    'type': 'credit',
    'amount': 0
  }]
}];

//list of rental modifcation
//useful for exercise 6
var rentalModifications = [{
  'rentalId': '1-pb-92',
  'returnDate': '2016-01-04',
  'distance': 150
}, {
  'rentalId': '3-sa-92',
  'pickupDate': '2015-12-05'
}];
function exercice1(rental){
  var carid = rental.carId;
  var i;
  var pricePerKm;
  var pricePerDay;
  for(i =0; i < cars.length; i++){
    if(cars[i].id == carid){
    pricePerKm = cars[i].pricePerKm;
    console.log("Price per kms =  " + pricePerKm);
    pricePerDay = cars[i].pricePerDay;
    console.log("Price per day =  " + pricePerDay);
    }
  }
  var pickupDate = rental.pickupDate;
  var returnDate = rental.returnDate;

  var numberday = numberofday(pickupDate,returnDate);
  var reduce = pricereduce(numberday);
  pricePerDay = pricePerDay * reduce;
  var kms = rental.distance;
  var time = calcultime(numberday, pricePerDay);
  var distance = calculdistance(kms,pricePerKm);

  var price = time + distance;
  console.log(price);
  rental.price = price;

  var commission = 0.7 * price;
  var insurance_commission = 0.5 * commission;
  var roadside_assistance = 1 * numberday;
  var drivy = commission - insurance_commission - roadside_assistance;

  rental.commission.insurance = insurance_commission;
  rental.commission.assistance = roadside_assistance;
  rental.commission.drivy = drivy;

  var reductible = rental.options.deductibleReduction;
  var option = 0;
  if(reductible){
    option = 4 * numberday;
    price += option;
    rental.price = price;
    rental.commission.drivy += option;
  }
}

function numberofday(pickupDate,returnDate){
  var date1 = new Date(pickupDate);
  var date2 = new Date(returnDate);
  var result = (date2 - date1)/(1000*60*60*24);
  result +=1;
  console.log('nbre de jour : ' + result);
  return result; // We increment + 1 if the person rent a car for 1 day for example.
}
function pricereduce(days){
  var reduce = 1;
  if(days > 1 && days <= 4){
    reduce = 1 - 0.1;
  }
  else if(days > 4 && days <= 10){
    reduce = 1 - 0.3;
  }
  else if(days > 10){
    reduce = 1 - 0.5;
  }
  return reduce;
}

function calcultime(days, price){
 var time = days * price;
 console.log("price time = " + time);
 return time;
}

function calculdistance(kms, price){
 var distance = kms * price;
 console.log("price distance = " + distance);
 return distance;
}

//All console command.
var i;
for(i=0; i < rentals.length; i++){
  console.log(exercice1(rentals[i]));
}
console.log(cars);
console.log(rentals);
console.log(actors);
console.log(rentalModifications);
