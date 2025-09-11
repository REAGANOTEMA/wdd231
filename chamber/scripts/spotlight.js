const spotlightContainer = document.getElementById('spotlight-container');
if(spotlightContainer){
  const goldSilverMembers = members.filter(m => m.level==='2'||m.level==='3');
  function getRandomSpotlights(list,count=3){ return [...list].sort(()=>0.5-Math.random()).slice(0,count); }
  const spotlights = getRandomSpotlights(goldSilverMembers);
  spotlightContainer.innerHTML = '';
  spotlights.forEach(member=>{
    const card=document.createElement('div');
    card.className='member-card';
    card.innerHTML=`<img src="${member.image}" alt="${member.name}">
                    <h3>${member.name}</h3>
                    <p><strong>Level:</strong> ${member.level}</p>
                    <p><strong>Email:</strong> <a href="mailto:${member.email}">${member.email}</a></p>
                    <p><strong>Phone:</strong> <a href="tel:${member.phone}">${member.phone}</a></p>
                    <p><strong>Location:</strong> ${member.location}</p>`;
    spotlightContainer.appendChild(card);
  });
}
