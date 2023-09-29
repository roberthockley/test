const AWS = require('aws-sdk');

// Configure AWS SDK (you may also use environment variables or other methods to configure credentials)
const region = 'ap-southeast-1'; // Replace with your desired AWS region
AWS.config.update({ region: region });

const securityhub = new AWS.SecurityHub();

async function getFindingsWithComplianceStatus(complianceStatus) {
    try {
        const params = {
            MaxResults: 100, // Adjust as needed to retrieve findings in batches
        };

        const filteredFindings = [];

        do {
            const response = await securityhub.getFindings(params).promise();
            const findings = response.Findings;
            for (let i = 0; i < findings.length; i++) {
                filteredFindings.push(findings[i]);

            }

            

            // Check if there are more findings to retrieve
            if (response.NextToken) {
                console.log(`Retrieved ${filteredFindings.length} findings. Getting next batch...`);
                params.NextToken = response.NextToken;
            } else {
                break; // No more findings to retrieve
            }
        } while (true);

        return filteredFindings;
    } catch (error) {
        console.error('Error retrieving findings:', error);
        throw error;
    }
}

(async () => {
    try {
        const complianceStatus = 'NOT_AVAILABLE'; // Replace with the desired compliance status
        const filteredFindings = await getFindingsWithComplianceStatus(complianceStatus);
        //console.log(filteredFindings)

          

          
          console.log(filteredFindings);

        //updateFinding(filteredFindings)
        //securityhub.batchUpdateFindings()

        //console.log(`Findings with ${complianceStatus} status:`, filteredFindings);
    } catch (error) {
        console.error('Script execution failed:', error);
    }
})();



