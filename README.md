# api [![Build Status](https://travis-ci.org/classmere/api.svg?branch=master)](https://travis-ci.org/classmere/api)
The API server that powers classmere + API reference sheet.

## API Reference (beta)
- [Courses](#courses)
- [Subjects](#subjects)
- [Buildings](#buildings)
- [Search](#search)

### Courses
#### Retrieve a course
**GET** `/courses/<subject_code>/<course_number>`

Returns all information about a particular course, including information
about each of its individual sections. Note: "credits" is sometimes a range,
e.g. "1-16", therefore it is returned as an integer array.

##### Example
```
GET /courses/ANS/327
```

##### Response
```json
{
    "title": "ANTH 449 BIOCULTURAL PERSPECTIVES ON HUMAN REPRODUCTION",
    "subjectCode": "ANTH",
    "courseNumber": 449,
    "credits": "4",
    "description": "Examines human reproduction and sexuality from the
    perspective of the New Biocultural Synthesis, a theoretical approach in
    anthropology that examines the interface of evolved biological,
    sociocultural and political-economic factors that interact to produce
    complex human behaviors and biologies. Topics are presented from a
    life-history perspective where questions related to human reproduction
    and evolutionary history are examined across the lifespan from mating and
    conception through elderhood and menopause. Lec/lab.",
    "updated": "2017-11-18T01:45:34.796Z",
    "sections": [
        {
            "term": "Sp18",
            "session": "Full Term",
            "crn": 59005,
            "credits": 4,
            "instructor": "Cheyney, M.",
            "meetingTimes": [
                {
                    "startTime": "2017-11-18T10:00:00+00:00",
                    "endTime": "2017-11-18T11:50:00+00:00",
                    "days": "MW",
                    "buildingCode": "WALD",
                    "roomNumber": 201
                }
            ],
            "startDate": "04/02/18",
            "endDate": "06/08/18",
            "campus": "Corv",
            "type": "Lecture",
            "status": "Open",
            "enrollmentCapacity": 30,
            "enrollmentCurrent": 0,
            "waitlistCapacity": 0,
            "waitlistCurrent": 0,
            "fees": "",
            "restrictions": "",
            "comments": "",
            "textbookUrl": ""
        }
    ],
    "_version": 1
}
```

#### Retrieve a list of all courses
**GET** `/courses`

Returns a list of all courses. Each entry is an object consisting of a
`title`, `subjectCode` and `courseNumber`, the latter two of which can be
used to form a request to get the full information about a course.

##### Example
```
GET /courses
```

##### Response
```json
[
    {
        "title": "AAE 210 INTRODUCTION TO AEROSPACE ENGINEERING",
        "subjectCode": "AAE",
        "courseNumber": 210
    }, {
        "title": "AAE 412 SPACE SYSTEMS ENGINEERING",
        "subjectCode": "AAE",
        "courseNumber": 412
    }
]
```

### Subjects
#### Retrieve a list of all subject codes
**GET** `/subjects`

Returns a list of all subject code strings.

##### Example
```
GET /subjects
```

##### Response
```json
[
    "AAE", 
    "ACTG", 
    "AEC", 
    "AED", 
    "AG", 
    "AGRI",
    "ALS"
]
```

### Buildings
#### Retrieve a building on the OSU campus
**GET** `/buildings/<building_abbreviation>`

Returns info on the selected building.

>See the campus map at http://oregonstate.edu/campusmap/ for building
abbreviations and locations. Or see the campus map at the back of the
Registration Information Handbook.

##### Example
```
GET /buildings/KEC
```

##### Response
```json
{
    "abbr": "KEC",
    "name": "Kelley Engineering Center",
    "address": "110 SW Park Terrace",
    "buildingNumber": 3,
    "latitude": 44.567164,
    "longitude": -123.278692
}
```

#### Retrieve a list of all OSU buildings
**GET** `/buildings`

Returns a list of all buildings on all OSU campuses, down to the sheds(!)

##### Example
```
GET /buildings
```

##### Response
```json
[
    {
        "abbr": "Goss",
        "name": "Goss Stadium",
        "address": "430 SW Langton Place",
        "buildingNumber": 108,
        "latitude": 44.563424,
        "longitude": -123.277824
    },

    {
        "abbr": "Mfd",
        "name": "Merryfield Hall",
        "address": "1600 SW Monroe Ave",
        "buildingNumber": 2,
        "latitude": 44.567457,
        "longitude": -123.273996
    }
]
```

### Search
#### Search for courses
**GET** `/search/courses/<keyword>`

Returns a list of up to 100 matching courses, not including individual
sections.

##### Example
```
GET /search/courses/nutrition
```

##### Response
```json
[
    {
        "title": "HORT 316 PLANT NUTRITION",
        "subjectCode": "HORT",
        "courseNumber": 316,
        "credits": "4",
        "description": "Basic concepts and principles of plant mineral
        nutrition that provide a basis for solving practical nutritional
        problems in horticultural crops. Areas covered include mineral
        nutrients, nutrient availability in the soil and plant uptake,
        nutrient deficiencies and toxicities and their causes and remedies,
        and plant and soil analysis. Lec/lab/rec. (CSS 205 [D-] or CSS 305
        [D-] or SOIL 205 [D-] )",
        "updated": "2017-11-18T02:04:36.700Z",
        "sections": [
            {
                "term": "W18",
                "session": "Full Term",
                "crn": 33124,
                "credits": 4,
                "instructor": "Kowalewski, A.",
                "meetingTimes": [
                    {
                        "startTime": "2017-11-18T13:00:00+00:00",
                        "endTime": "2017-11-18T13:50:00+00:00",
                        "days": "MWF",
                        "buildingCode": "ALS",
                        "roomNumber": 4000
                    }
                ],
                "startDate": "01/08/18",
                "endDate": "03/16/18",
                "campus": "Corv",
                "type": "Lecture",
                "status": "Open",
                "enrollmentCapacity": 45,
                "enrollmentCurrent": 26,
                "waitlistCapacity": 0,
                "waitlistCurrent": 0,
                "fees": "",
                "restrictions": "Prereqs: (CSS 205 [D-] or CSS 305 [D-] or
                SOIL 205 [D-] )",
                "comments": "",
                "textbookUrl": ""
            }
        ],
        "score": 0.625
    }
]
```

#### Search for buildings
**GET** `/search/buildings/<keyword>`

Returns a list of up to 100 matching buildings.

##### Example
```
GET /search/buildings/Kelley
```

##### Response
```json
[
    {
        "abbr": "KEC",
        "name": "Kelley Engineering Center",
        "address": "110 SW Park Terrace",
        "buildingNumber": 3,
        "latitude": 44.567164,
        "longitude": -123.278692,
        "score": 0.6666666666666666
    }
]
```
