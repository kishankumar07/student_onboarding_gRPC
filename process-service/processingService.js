export function process(call) {
    // console.log('this is the value of call at ./process-service/processingService.js:',call)
      const onboardRequest = call.request;
  
      const time = onboardRequest.orderId * 1000 + onboardRequest.degreeId * 10;
  
      
      call.write({ status: 0 }); // NEW
      call.write({ status: 1 }); // QUEUED
  
      setTimeout(() => {
          call.write({ status: 2 }); // PROCESSING
          setTimeout(() => {
              call.write({ status: 3 }); // DONE
              call.end(); // End 
          }, time);
      }, time);
  }
  