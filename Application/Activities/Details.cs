using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain;
using MediatR;
using Persistence;

namespace Application.Activities
{
    public class Details
    {
        public class Query : IRequest<Activity>
        {
            public Guid Id { get; set; }
        }

        class Handler : IRequestHandler<Query, Activity?>
        {
            private readonly DataContext _context;

            public Handler(DataContext context)
            {
                _context = context;
            }
            public async Task<Activity?> Handle(Query request, CancellationToken cancellationToken)
            {
                if (_context is null || _context.Activities is null)
                {
                    throw new ArgumentNullException("_context");
                }
                return await _context.Activities.FindAsync(request.Id);
            }
        }
    }
}