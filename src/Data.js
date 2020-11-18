// Our Data House
import config from './config';

export default class Data {
    /* The api method ia a wrapper method that is use for all 
    authentication and authorization request from our API */
    api(
        path, 
        method = 'GET', 
        body = null, 
        requiresAuth = false, 
        credentials = null) {
        const url = config.apiBaseUrl + path;
    
      const options = {
        method,
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
        },
      };
  
      if (body !== null) {
        options.body = JSON.stringify(body);
      }
  
      // Check if auth is required
      if (requiresAuth) {    
        const encodedCredentials = btoa(`${credentials.emailAddress}:${credentials.password}`);
        options.headers['Authorization'] = `Basic ${encodedCredentials}`;
      }
      return fetch(url, options);
    }
  
   // Making a GET require to our API to get a new user
    async getUser(emailAddress, password) {
        const response = await this.api(`/users`, 'GET', null, true, { emailAddress, password });
        if (response.status === 200) {
         return response.json().then(data => data);
        }
        else if (response.status === 401) {
         return null;
        }
        else {
         throw new Error();
        }
    }

    // Making a POST require to our API to create a new user
    async createUser(user) {
        const response = await this.api('/users', 'POST', user);
        if (response.status === 201) {
            return [];
        }
        else if (response.status === 400) {
            return response.json().then(data => {
                return data.errors;
            });
        }
        else {
            throw new Error(); 
        }
    }

    // We are making a GET REQUEST to our API /courses route to the list of all courses
    async getAllCourses() {
        const response = await this.api('/courses', 'GET'); 
        if (response.status === 200) {
            const courses = await response.json().then(data => data);
            return courses; 
        }
        else if (response.status === 400) {
            return response.json().then(data => {
                return data.errors;
            });
        }
        else {
            throw new Error();
        }
    }

    // We are making a POST REQUEST to our API /courses route to create a new course
    async createNewCourse(emailAddress, password, course){
        const response = await this.api('/courses', 'POST', course, true, { 
            emailAddress,
            password
        });
        if (response.status === 201) {
            return [];
        } else if (response.status === 400) { 
            return response.json().then(data => {
                return data.errors;
            });
        } else {
            throw new Error();
        }
    }

    /*  We are making a GET REQUEST to our API /courses/:id route to get a single course detail */
    async getCourseDetails(id){
        const response = await this.api(`/courses/${id}`, 'GET');
        if (response.status === 200) {
            const course = await response.json().then(data => data);
            return course;
        }
        else if (response.status === 400) {
            return response.json()
                .then(data => {
                    return data.errors;
                });
        }
        else {
            throw new Error(); 
        }
    }

    /* We are making a PUT REQUEST to our API /courses/:id route 
    to get a single course and update the course data */
    async getUpdateCourse(id, course, emailAddress, password) {
        const response = await this.api(`/courses/${id}`, 'PUT', course, true, {
          emailAddress, 
          password,
        });
        if (response.status === 204) {
          return [];
        }
        else if (response.status === 400 || 
                 response.status === 401 || 
                 response.status === 403) {
          return response.json()
           .then(data => {
            return data.errors;
          });
        } else {
            throw new Error();
        }
      }


    /* We are making a DELETE REQUEST to our API /courses/:id route 
    to delete a single course */
    async deleteSingleCourse(id, emailAddress, password) {
        const response = await this.api(`/courses/${id}`, 'DELETE', null, true, {
            emailAddress,
            password,
        });
        // if the response was successful, than return an empty array
        if(response.status === 204) {
            return [];
        }
        else if(response.status === 400 ||
                response.status === 401 ||
                response.status === 403) {
                    return response.json().then(data => {
                        return data.errors;
                    });
            } else {
                throw new Error();
            }
    }

    

}
