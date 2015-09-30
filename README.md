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
**GET** `https://classmere.herokuapp.com/courses/subject_code/course_number`
Returns all information about a particular course, including information about each of its individual sections.
Note: "credits" is sometimes a range, e.g. "1-16", therefore it is returned as an integer array.
##### Example Response
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
