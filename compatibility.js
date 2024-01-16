const fs = require('fs');

const fileContent = fs.readFileSync('input.json', 'utf-8');
const input = JSON.parse(fileContent);

const teamTraits = {
    intelligence: 0,
    strength: 0,
    endurance: 0,
    charisma: 0
};

//add up total scores of the current team to see the strengths and weaknesses
for (const team of input.team) {
    teamTraits.intelligence += team.attributes.intelligence;
    teamTraits.strength += team.attributes.strength;
    teamTraits.endurance += team.attributes.endurance;
    teamTraits.charisma += team.attributes.charisma;
}

//find the weakest trait on the team
let minValue = Infinity;
let minTrait;

//loop that iterates through teamTraits object and sets lowest trait value into variable as well as the name of the trait
for (const trait in teamTraits) {
    if(teamTraits.hasOwnProperty(trait)) {
        if(teamTraits[trait] < minValue) {
            minValue = teamTraits[trait];
            minTrait = trait;
        }
    }
}

// object to store applicants
const result = {
    scoredApplicants: []

};

//compare which applicant is strongest in the needed category as
let firstApplicant = input.applicants[0];
let maxTrait = firstApplicant.attributes[minTrait];

for (applicant of input.applicants) {

    const totalScore = applicant.attributes.intelligence +
    applicant.attributes.strength + 
    applicant.attributes.endurance + 
    applicant.attributes.charisma;

    //scoring system so that if an applicant had 10/10/10/10 traits it would add up to 1
    let score =  (totalScore * 1/4)/10;

    //bonus points given to an applicant with the highest value in trait the team needs the most
    if (applicant.attributes[minTrait] > maxTrait) {
        maxTrait = applicant.attributes[minTrait];
        tieApplicants = [];
        score += 0.2;
    }

    result.scoredApplicants.push({
        name: applicant.name,
        score: score
    });
}



const jsonOutput = JSON.stringify(result, null, 2); // The third argument (2) is for indentation
console.log(jsonOutput);
fs.writeFileSync('output.json', jsonOutput);
console.log('Output saved to output.json');
