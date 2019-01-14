using Microsoft.Azure.Documents;
using Microsoft.Azure.Documents.Client;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;

namespace PocOAMA.DB
{
    public abstract class DocumentDBRepositoryBase<DatabaseDB> : IDocumentDBRepository<DatabaseDB>
    {
        #region Repository Configuration

        protected string Endpoint = string.Empty;
        protected string Key = string.Empty;
        protected string DatabaseId = string.Empty;
        protected string CollectionId = string.Empty;
        protected DocumentClient client;
        protected DocumentCollection collection;

        #endregion

        public DocumentDBRepositoryBase()
        {

        }

        public Task<ResourceResponse<Attachment>> CreateAttachmentAsync(string attachmentsLink, object attachment, RequestOptions options)
        {
            throw new NotImplementedException();
        }

        public IEnumerable<T> CreateDocumentQuery<T>(string query, FeedOptions options) where T : class
        {
            throw new NotImplementedException();
        }

        public Task<Document> CreateItemAsync<T>(T item) where T : class
        {
            throw new NotImplementedException();
        }

        public Task<Document> CreateItemAsync<T>(T item, RequestOptions options) where T : class
        {
            throw new NotImplementedException();
        }

        public Task DeleteItemAsync(string id)
        {
            throw new NotImplementedException();
        }

        public Task DeleteItemAsync(string id, string partitionKey)
        {
            throw new NotImplementedException();
        }

        public Task<StoredProcedureResponse<dynamic>> ExecuteStoredProcedureAsync(string procedureName, string query, string partitionKey)
        {
            throw new NotImplementedException();
        }

        public Task<Document> GetDocumentAsync(string id, string partitionKey)
        {
            throw new NotImplementedException();
        }

        public Task<T> GetItemAsync<T>(string id) where T : class
        {
            throw new NotImplementedException();
        }

        public Task<T> GetItemAsync<T>(string id, string partitionKey) where T : class
        {
            throw new NotImplementedException();
        }

        public Task<IEnumerable<T>> GetItemsAsync<T>() where T : class
        {
            throw new NotImplementedException();
        }

        public Task<IEnumerable<T>> GetItemsAsync<T>(Expression<Func<T, bool>> predicate) where T : class
        {
            throw new NotImplementedException();
        }

        // Code ommitted

        public abstract Task InitAsync(string collectionId);

        public Task<ResourceResponse<Attachment>> ReadAttachmentAsync(string attachmentLink, string partitionkey)
        {
            throw new NotImplementedException();
        }

        public Task<ResourceResponse<Attachment>> ReplaceAttachmentAsync(Attachment attachment, RequestOptions options)
        {
            throw new NotImplementedException();
        }

        public Task<Document> UpdateItemAsync<T>(string id, T item) where T : class
        {
            throw new NotImplementedException();
        }
    }
}