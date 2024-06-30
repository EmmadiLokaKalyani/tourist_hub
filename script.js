function recommendPlaces() {
    const age = document.getElementById('ageInput').value;
   
    if (age >= 10 && age <= 20) {
        window.location.href = 'age10.html'; // Replace with your actual URL
    } else if (age > 20 && age <= 30) {
        window.location.href = 'age20.html'; // Replace with your actual URL
    } else if (age > 30 && age <= 40) {
        window.location.href = 'age30.html'; // Replace with your actual URL
    }
    else if (age > 40 && age <= 50) {
        window.location.href = 'age40.html'; // Replace with your actual URL
    }
    else if (age > 50 && age <= 60) {
        window.location.href = 'age50.html'; // Replace with your actual URL
    }
     else if (age > 60) {
        window.location.href = 'age60.html'; // Replace with your actual URL
    } else {
        alert('Please enter a valid age.');
    }
}
