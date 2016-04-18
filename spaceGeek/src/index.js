/**
    Copyright 2014-2015 Amazon.com, Inc. or its affiliates. All Rights Reserved.

    Licensed under the Apache License, Version 2.0 (the "License"). You may not use this file except in compliance with the License. A copy of the License is located at

        http://aws.amazon.com/apache2.0/

    or in the "license" file accompanying this file. This file is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.
*/

/**
 * This simple sample has no external dependencies or session management, and shows the most basic
 * example of how to create a Lambda function for handling Alexa Skill requests.
 *
 * Examples:
 * One-shot model:
 *  User: "Alexa, ask Space Geek for a space fact"
 *  Alexa: "Here's your space fact: ..."
 */

/**
 * App ID for the skill
 */
var APP_ID = 'amzn1.echo-sdk-ams.app.d41f3925-7585-4d39-bb65-ba7263a835e1'; //replace with "amzn1.echo-sdk-ams.app.[your-unique-value-here]";

/**
 * Array containing space facts.
 */
var COLORADO_FACTS = [
    "Beulah red is the name of the red marble that gives the Colorado State Capitol its distinctive splendor. Cutting, polishing, and installing the marble in the Capitol took six years, from 1894 to 1900. All of the Beulah red marble in the world went into the Capitol. It cannot be replaced, at any price.",
    "Colorado is the only state in history, to turn down the Olympics. In 1976 the Winter Olympics were planned to be held in Denver. 62% of all state Voters choose at almost the last minute not to host the Olympics, because of the cost, pollution and population boom it would have on the State Of Colorado, and the City of Denver.",
    "The United States Air Force Academy is located in Colorado Springs.",
    "The world's largest flat-top mountain is in Grand Mesa.",
    "In Fruita, the town folk celebrate 'Mike the Headless Chicken Day'. Seems that a farmer named L.A. Olsen cut off Mike's head on September 10, 1945 in anticipation of a chicken dinner - and Mike lived for another 4 years without a head.",
    "The LoDo region of Denver stands for Lower Downtown.",
    "Denver, lays claim to the invention of the cheeseburger. The trademark for the name Cheeseburger was awarded in 1935 to Louis Ballast.",
    "The highest paved road in North America is the Road to Mt. Evans off of I-70 from Idaho Springs. The Road climbs up to 14,258 Ft. above sea level.",
    "Colorado means colored red and is known as the Centennial State.",
    "The Durango & Silverton Narrow Gauge Railroad continues to provide year round train service operating a historical train with rolling stock indigenous to the line. The line was constructed primarily to haul mine ores, both gold and silver, from the San Juan Mountains.",
    "The United States federal government owns more than 1/3 of the land in Colorado.",
    "Colorado contains 75% of the land area of the U.S. with an altitude over 10,000 feet.",
    "Colorado has 222 state wildlife areas.",
    "Colfax Avenue in Denver is the longest continuous street in America.",
    "The 13th step of the state capital building in Denver is exactly 1 mile high above sea level.",
    "The Dwight Eisenhower Memorial Tunnel between Clear Creek & Summit counties is the highest auto tunnel in the world. Bored at an elevation of 11,000 feet under the Continental Divide it is 8,960 feet long and the average daily traffic exceeds 26,000 vehicles.",
    "Leadville is the highest incorporated city in the United States at 10,430 feet elevation. Because there was lots of silver named towns at the time, the founding fathers suggested Leadville.",
    "Katherine Lee Bates wrote “America the Beautiful” after being inspired by the view from Pikes Peak.",
    "Hundreds of thousands of valentines are re-mailed each year from Loveland.",
    "Fountain, has the distinction of being the United States' millennium city because it best symbolizes the overall composition of America. Fountain is the most accurate representation of the American melting pot. Fountain was chosen after a Queens College sociologist crunched Census Bureau statistics in an effort to find the one city in the country that best represented the population make-up of the United States.",
    "Pueblo is the only city in America with four living recipients of the Medal of Honor.",
    "The tallest building in Colorado is the Republic Plaza at 57 stories high, in Denver.",
    "Every year Denver host the worlds largest Rodeo, the Western Stock show.",
    "Denver has the largest city park system in the nation with 205 parks in City limits and 20,000 Acres of parks in the nearby mountains.",
    "Dove Creek is the Pinto Bean capital of the world.",
    "The tallest sand dune in America is in Great Sand Dunes National Monument outside of Alamosa. This bizarre 46,000-acre landscape of 700-foot sand peaks was the creation of ocean waters and wind more than one million years ago.",
    "The World's First Rodeo was held on July 4th, 1869 in Deer Trail.",
    "Lieutenant Zebulon Montgomery Pike explored the southwest portion of the Louisiana Territory in 1806 and though he never climbed the peak that bears his name, he did publish a report that attracted a lot of interest to the area.",
    "The slogan of Pikes Peak or Bust, painted across many of the prairie schooners, was born at a time as fortune hunters headed west. Although only a handful of those who flocked to the region ever found gold.",
    "At 14,110 feet above sea level over 400,000 people ascend Pikes Peak each year.",
    "The aptly named town of Twin Lakes lays adjacent two natural lakes at the foot of Colorado's highest Fourteener, Mt. Elbert.",
    "The Colorado Rockies are part of the North American Cordillera, which stretches 3,000 miles from Alaska, through western Canada and the United States, into northern Mexico. The centerpieces of this dramatic uplift are the peaks over 14,000 feet, or Fourteeners, as they are affectionately referred to by climbers. There are 52 Fourteeners in Colorado.",
    "Rocky Ford has been dubbed the melon capital of the world.",
    "The Yampa River below the northwest town of Craig holds northern pike in the 20-pound range, while the Roaring Fork and Frying Pan rivers are prime spots for trout fishing.",
    "Colorado has the highest mean altitude of all the states.",
    "Mesa Verde features an elaborate four-story city carved in the cliffs by the Ancestral Pueblo people between 600 and 1300 A.D. The mystery surrounding this ancient cultural landmark is the sudden disappearance of the thousands of inhabitants who created the more than 4,000 identified structures.",
    "Colorado has more microbreweries per capita than any other state.",
    "The Kit Carson County Carousel in Burlington dates back to 1905, making it the oldest wooden merry-go-round in the United States. It is the only wooden carousel in America still with its original paint.",
    "The Durango and Silverton Narrow Gauge Railroad has been in continuous operation since 1881 and has appeared in more than a dozen movies including How the West Was Won (1963) and Butch Cassidy and the Sundance Kid (1969).",
    "The highest suspension bridge in the world is over the Royal Gorge near Canon City. The Royal Gorge Bridge spans the Arkansas River at a height of 1,053 feet.",
    "The world's largest natural hot springs pool located in Glenwood Springs. The two-block long pool is across the street from the historic Hotel Colorado, a favorite stop of former president Teddy Roosevelt.",
    "Built in 1867 by Seth Lake, the Astor House in Golden was the first stone hotel built west of the Mississippi River.",
    "Colorado's southwest corner borders Arizona, New Mexico and Utah the only place in America where the corners of four states meet.",
    "There are nearly 20 rivers whose headwaters begin in Colorado, with the Continental Divide directing each river's course.",
    "The Colorado Rockies play at the 50,000 seat Coors Field, located in downtown Denver.",
    "In 1859, John Gregory discovered The Gregory Lode in a gulch near Central City. Within two weeks, the gold rush was on and within two months the population grew to 10,000 people in search of their fortune. It came to be known as The Richest Square Mile on Earth.",
    "Colorado's first and oldest military post, Fort Garland was established in 1858 and commanded by the legendary frontiersman Kit Carson.",
    "Abundant nesting and migrating birds and other native animals provide a world-class watchable wildlife experience. Bald eagles and other raptors, sandhill cranes, shore birds and water birds can be seen seasonally at San Luis Lakes near Alamosa.",
    "Florissant Fossil Beds National Monument near Cripple Creek is a lesson in history set in the one-time shadow of the Guffey Volcano. The volcano erupted millions of years ago, creating fossils and leaving the valley filled with petrified trees.",
    "ohn Henry Doc Holliday's brief and tumultuous existence led him to Glenwood Springs where he succumbed to tuberculosis and died at the Hotel Glenwood on November 8, 1887.",
    "In Alamosa throwing missles at cars is illegal.",
    "In Aspen catapults may not be fired at buildings.",
    "In Boulder it is illegal to permit ones llama to graze on city property.",
    "In Boulder couches may not be placed on outside porches.",
    "In Cripple Creek it is illegal to bring your horse or pack mule above the ground floor of any building.",
    "In Denver it is unlawful to lend your vacuum cleaner to your next-door neighbor.",
    "In Denver you may not drive a black car on Sundays.",
    "It is illegal to mistreat rats in Denver, Colorado.",
    "In Fountain it is illegal to have weeds in your yard",
    "In Logan County it is illegal for a man to kiss a woman while she is asleep.",
    "In Louiseville, Colorado residents may not own chickens, but may own up to three turkeys.",
    "In Pueblo it is illegal to let a dandelion grow within the city limits.",
    "In Sterling cats may not run loose without having been fit with a taillight.",
    "Boulder's Third Flatiron towers 1,400 feet high, a few hundred feet higher than the Empire State Building, and has been climbed by people without using their hands, on roller skates, naked and in eight minutes (by separate climbers).",
    "Scott Carpenter, a NASA astronaut, grew up in Boulder. He named his space capsule after his home on Aurora and 7th Streets. The capsule was Aurora 7.",
    "The dome of the Colorado State Capitol is covered with 200 ounces of 24K gold, but the really priceless building material was used inside as wainscoting. It is Colorado onyx, a rare stone found near Beulah, Colo. The entire world's supply was used in this building and no more has ever been found. State law prohibits building any structure that would block the view of the mountains from the State Capitol.",
    "Metro Denver collects more for the arts on a per capita basis than any other city. The seven county Denver metro area (an area the size of Connecticut) has a self-imposed 10th of a cent sales tax for the arts that raises up to $36 million a year, which is distributed to 300 arts organizations and facilities.",
    "There are 200 named peaks visible from Denver, including 32 that soar to 13,000 feet and above. The mountain panorama visible from Denver is 140 miles long.",
    "In Denver’s rarified air, golf balls go 10 percent farther. So do cocktails. Alcoholic drinks pack more of a punch than at sea level.",
    "With less water vapor in the air at this altitude, the sky really is bluer in Colorado.",
    "The first permanent structure in Denver was a saloon.",
    "Led Zeppelin played their first ever American show at the Denver Auditorium Arena on December 26, 1968.",
    "There were originally three separate towns, with three separate names, where Denver now stands. In 1859, the other names were dropped in return for a barrel of whiskey to be shared by all.",

];

/**
 * The AlexaSkill prototype and helper functions
 */
var AlexaSkill = require('./AlexaSkill');

/**
 * SpaceGeek is a child of AlexaSkill.
 * To read more about inheritance in JavaScript, see the link below.
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Introduction_to_Object-Oriented_JavaScript#Inheritance
 */
var ColoradoGeek = function () {
    AlexaSkill.call(this, APP_ID);
};

// Extend AlexaSkill
ColoradoGeek.prototype = Object.create(AlexaSkill.prototype);
ColoradoGeek.prototype.constructor = ColoradoGeek;

ColoradoGeek.prototype.eventHandlers.onSessionStarted = function (sessionStartedRequest, session) {
    console.log("ColoradoGeek onSessionStarted requestId: " + sessionStartedRequest.requestId
        + ", sessionId: " + session.sessionId);
    // any initialization logic goes here
};

ColoradoGeek.prototype.eventHandlers.onLaunch = function (launchRequest, session, response) {
    console.log("ColoradoGeek onLaunch requestId: " + launchRequest.requestId + ", sessionId: " + session.sessionId);
    handleNewFactRequest(response);
};

/**
 * Overridden to show that a subclass can override this function to teardown session state.
 */
ColoradoGeek.prototype.eventHandlers.onSessionEnded = function (sessionEndedRequest, session) {
    console.log("ColoradoGeek onSessionEnded requestId: " + sessionEndedRequest.requestId
        + ", sessionId: " + session.sessionId);
    // any cleanup logic goes here
};

ColoradoGeek.prototype.intentHandlers = {
    "GetNewFactIntent": function (intent, session, response) {
        handleNewFactRequest(response);
    },

    "AMAZON.HelpIntent": function (intent, session, response) {
        response.ask("You can ask Colorado Geek tell me a Colorado fact, or, you can say exit... What can I help you with?", "What can I help you with?");
    },

    "AMAZON.StopIntent": function (intent, session, response) {
        var speechOutput = "Goodbye";
        response.tell(speechOutput);
    },

    "AMAZON.CancelIntent": function (intent, session, response) {
        var speechOutput = "Goodbye";
        response.tell(speechOutput);
    }
};

/**
 * Gets a random new fact from the list and returns to the user.
 */
function handleNewFactRequest(response) {
    // Get a random space fact from the space facts list
    var factIndex = Math.floor(Math.random() * COLORADO_FACTS.length);
    var fact = COLORADO_FACTS[factIndex];

    // Create speech output
    var speechOutput = "Here's your Colorado fact: " + fact;

    response.tellWithCard(speechOutput, "ColoradoGeek", speechOutput);
}

// Create the handler that responds to the Alexa Request.
exports.handler = function (event, context) {
    // Create an instance of the SpaceGeek skill.
    var coloradoGeek = new ColoradoGeek();
    coloradoGeek.execute(event, context);
};
