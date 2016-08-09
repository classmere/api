# api [![Build Status](https://travis-ci.org/classmere/api.svg?branch=master)](https://travis-ci.org/classmere/api)
The API server that powers classmere + API reference sheet.

## API Reference (beta)
### Courses
#### List all courses
**GET** `/courses/`
Returns a list of all course names and abbreviations in the classmere database.
##### Example
```
GET /courses
```
##### Response
```json
[
	{
		"course": "BIOCULTURAL PERSPECTIVES ON HUMAN REPRODUCTION",
		"abbr": "ANTH 449"
	},
	{...}
]
```

#### Retrieve a course
**GET** `/courses/<subject_code>/<course_number>`
Returns all information about a particular course, including information about each of its individual sections.
Note: "credits" is sometimes a range, e.g. "1-16", therefore it is returned as an integer array.

##### Example
```
GET /courses/ANS/327
```
##### Response
```json
{
  "id": "900650b1-e3ce-4ee1-bfac-fdc6079f8abf",
  "title": "Applied Physiology of Reproduction",
  "subjectCode": "ANS",
  "courseNumber": 327,
  "credits": [5],
  "description": "Principles, techniques and recent development in semen collection,
  evaluation, extension and preservation; artificial insemination, estrus detection
  and synchronization; pregnancy diagnosis and embryo transfer.",
  "sections": [
    {
      "id": "5cef6194-3f1c-4b8b-a297-6bfd5330f335",
        "term": "F15",
        "session": "Full Term",
        "crn": 20865,
        "credits": [4],
        "meetingTimes": [{
            "buildingCode": "DEAR",
            "days": "T",
            "endTime": "2015-09-23T17:50:00-07:00",
            "roomNumber": "222",
            "startTime": "2015-09-23T16:00:00-07:00"
        }],
        "startDate": "2015-09-24T07:00:00.000Z",
        "endDate": "2015-09-24T07:00:00.000Z",
        "campus": "Corv",
        "type": "Laboratory",
        "status": "Open",
        "capacity": 30,
        "currentEnrollment": 25,
        "waitlistCurrent": 0,
        "fees": null,
        "restrictions": null,
        "comments": "Wireless laptop required."
    },
    {...}
  ]
}
```

### Buildings
#### Retrieve a building on the OSU campus
**GET** `/buildings/<building_abbreviation>`
Returns info on the selected building

>See the campus map at http://oregonstate.edu/campusmap/ for building abbreviations and locations. Or see the campus map at the back of the Registration Information Handbook.

##### Example
```
GET /buildings/KEC
```
##### Response
```json
{
	"abbr": "KEC",
	"name": "KELLEY ENGINEERING CENTER",
	"address": "110 SW PARK TERRACE; CORVALLIS, OR 97331",
	"buildingNumber": "3",
	"sqft": "134009"
}
```

### Search
#### Search for courses
**GET** `/search/courses/<keyword>`
Returns a list of up to 100 matching courses, not including individual sections.

##### Example
```
GET /search/courses/nutrition
```
##### Response
```json
[
	{
		"title": "COMMUNITY NUTRITION",
		"subjectCode": "NUTR",
		"courseNumber": 523,
		"credits": [
			4
		],
		"description": "Meeting nutritional needs in community settings; nutritional status of individuals and groups; programs of public and private agencies and industry; intervention techniques. Roles of community nutritionist.",
		"hitScore": 3.1342711
	},
	{...}
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
		"_id": "57a52128797428f65db5d43c",
		"abbr": "KEC",
		"address": "110 SW PARK TERRACE; CORVALLIS, OR 97331",
		"buildingNumber": "3",
		"id": "ac6eceba-38f7-41d0-91d6-65175e7b83b5",
		"name": "KELLEY ENGINEERING CENTER",
		"sqft": "134009",
		"score": 0.6666666666666666
	}
]
```
