using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

using Amazon.DynamoDBv2;
using Amazon.DynamoDBv2.DataModel;
using Amazon.DynamoDBv2.DocumentModel;

namespace Backend.Repositories
{
    class DynamoDBRepository<T> : IRepository<T>
    {
        private DynamoDBContext _context;
        public DynamoDBRepository(IAmazonDynamoDB dynamoDBClient)
        {
            _context = new DynamoDBContext(dynamoDBClient);
        }

        public async Task<T> Add(T item)
        {
            await _context.SaveAsync<T>(item);
            return await _context.LoadAsync<T>(item);
        }

        public async Task<T> Get(string id)
        {
            return await _context.LoadAsync<T>(id);
        }

        public async Task<IEnumerable<T>> GetAll()
        {
            ScanFilter scanFilter = new ScanFilter();
            scanFilter.AddCondition("Id", ScanOperator.NotEqual, 0);
            ScanOperationConfig soc = new ScanOperationConfig
            {
                Filter = scanFilter
            };
            AsyncSearch<T> search = _context.FromScanAsync<T>(soc);

            return await search.GetRemainingAsync();
        }
    }
}
