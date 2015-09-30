# api
The API server that powers classmere + API reference sheet.

## API Reference (In beta)
### Courses
#### List all courses
**GET** `https://classmere.herokuapp.com/courses/`
Returns a list of all course names and abbreviations in the classmere database.
##### Example Response
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
**GET** `https://classmere.herokuapp.com/courses/course_abbr`
Returns all information about a particular course, including information about each of its individual sections.
Note: "credits" is sometimes a range, e.g. "1-16", therefore it is returned as a string.
##### Example Response
```json
{
  "id": "900650b1-e3ce-4ee1-bfac-fdc6079f8abf"
  "title": "Applied Physiology of Reproduction",
  "subjectCode": "ANS",
  "courseNumber": 327
  "credits": [5],
  "description": "Principles, techniques and recent development in semen collection, 
  evaluation, extension and preservation; artificial insemination, estrus detection 
  and synchronization; pregnancy diagnosis and embryo transfer.",
  "sections": [
    {
      "campus": "Corv",
      "capacity": 30,
      "credits": [5],
      "crn": 58749,
      "currentEnrollment": 0,
      "endDate": "2016-03-28T07:00:00.000Z",
      "fees": null,
      "id": "70118b6b-5557-4733-b1de-0ae4bf7b8f08",
      "idCourse": "900650b1-e3ce-4ee1-bfac-fdc6079f8abf",
      "meetingTimes": [{
          "buildingCode": "DEAR",
          "days": "R",
          "endTime": "2015-09-23T13:50:00-07:00",
          "roomNumber": "222",
          "startTime": "2015-09-23T12:00:00-07:00"
      }],
      "restrictions": null,
      "session": "Full Term",
      "startDate": "2016-03-28T07:00:00.000Z",
      "status": "Open",
      "term": "Sp16",
      "type": "Laboratory",
      "waitlistCurrent": 0
    },
    {...}
  ]
}
```

### Search
Search only works for courses currently. More functionality will be added in the future.
#### Search for courses
**GET** `https://classmere.herokuapp.com/search/courses`
Returns a list of up to 100 matching courses, not including invividual sections.
##### Parameters
| Name   | Type     | Description           |
| ------ | -------- | --------------------- |
| `q`    | `string` | The search terms      |
##### Example Response
```json
[
	{
		"title": "Applied Physiology of Reproduction",
		"abbr": "ANS 327",
		"credits": "5",
		"description": "Principles, techniques and recent development in semen collection, 
		evaluation, extension and preservation; artificial insemination, estrus detection 
		and synchronization; pregnancy diagnosis and embryo transfer.",
		"hitScore": 1.4482127
	},
	{...}
]
```
