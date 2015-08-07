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
  "title": "Applied Physiology of Reproduction",
  "abbr": "ANS 327",
  "credits": "5",
  "description": "Principles, techniques and recent development in semen collection, 
  evaluation, extension and preservation; artificial insemination, estrus detection 
  and synchronization; pregnancy diagnosis and embryo transfer.",
  "sections": [
    {
      "term": "Fall 2015",
      "startDate": "2015-09-24",
      "endDate": "2015-12-04",
      "session": null,
      "crn": 10037,
      "sectionNumber": 1,
      "credits": "5",
      "instructor": "Menino Jr, A.",
      "days": "TR",
      "startTime": "08:30:00",
      "endTime": "09:50:00",
      "location": "WITH 217",
      "campus": "Corv",
      "type": "Lecture",
      "status": "Open",
      "enrollmentCap": 30,
      "enrolled": 50,
      "waitlisted": 3,
      "waitlistCap": 10,
      "fees": "$20.00",
      "restrictions": "Prereqs: (ANS 316 [D-] and ANS 317 [D-] )",
      "comments": null
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
		and synchronization; pregnancy diagnosis and embryo transfer."
	},
	{...}
]
```
