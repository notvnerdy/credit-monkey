<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Admin Dashboard - Credit Monkey</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, sans-serif;
            background: #f5f7fa;
        }
        .header {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            padding: 20px 40px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        }
        .header h1 { font-size: 24px; }
        .logout {
            background: rgba(255,255,255,0.2);
            color: white;
            padding: 8px 20px;
            border-radius: 6px;
            text-decoration: none;
            transition: background 0.3s;
        }
        .logout:hover {
            background: rgba(255,255,255,0.3);
        }
        .container {
            max-width: 1200px;
            margin: 40px auto;
            padding: 0 20px;
        }
        .stats {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: 20px;
            margin-bottom: 40px;
        }
        .stat-card {
            background: white;
            padding: 30px;
            border-radius: 12px;
            box-shadow: 0 2px 10px rgba(0,0,0,0.05);
        }
        .stat-card h3 {
            color: #666;
            font-size: 14px;
            margin-bottom: 10px;
        }
        .stat-card .number {
            font-size: 36px;
            font-weight: bold;
            color: #667eea;
        }
        .leads-table {
            background: white;
            border-radius: 12px;
            box-shadow: 0 2px 10px rgba(0,0,0,0.05);
            overflow: hidden;
        }
        .table-header {
            padding: 20px 30px;
            border-bottom: 1px solid #e0e0e0;
        }
        .table-header h2 {
            font-size: 20px;
            color: #333;
        }
        table {
            width: 100%;
            border-collapse: collapse;
        }
        th, td {
            padding: 16px 30px;
            text-align: left;
        }
        th {
            background: #f8f9fa;
            color: #666;
            font-weight: 600;
            font-size: 12px;
            text-transform: uppercase;
        }
        tr:not(:last-child) td {
            border-bottom: 1px solid #f0f0f0;
        }
        tr:hover {
            background: #fafbfc;
        }
        .badge {
            display: inline-block;
            padding: 4px 12px;
            border-radius: 12px;
            font-size: 12px;
            font-weight: 500;
            background: #e3f2fd;
            color: #1976d2;
        }
        .empty {
            padding: 60px;
            text-align: center;
            color: #999;
        }
    </style>
</head>
<body>
    <div class="header">
        <h1>Credit Monkey Admin</h1>
        <a href="/admin/logout" class="logout">Logout</a>
    </div>
    
    <div class="container">
        <div class="stats">
            <div class="stat-card">
                <h3>Total Leads</h3>
                <div class="number">{{ $stats['total'] }}</div>
            </div>
            <div class="stat-card">
                <h3>Today's Leads</h3>
                <div class="number">{{ $stats['today'] }}</div>
            </div>
            <div class="stat-card">
                <h3>This Week</h3>
                <div class="number">{{ $stats['week'] }}</div>
            </div>
            <div class="stat-card">
                <h3>This Month</h3>
                <div class="number">{{ $stats['month'] }}</div>
            </div>
        </div>
        
        <div class="leads-table">
            <div class="table-header">
                <h2>Recent Leads</h2>
            </div>
            
            @if($leads->count() > 0)
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Phone</th>
                            <th>State</th>
                            <th>Message</th>
                            <th>Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        @foreach($leads as $lead)
                        <tr>
                            <td>#{{ $lead->id }}</td>
                            <td><strong>{{ $lead->name }}</strong></td>
                            <td>{{ $lead->email }}</td>
                            <td>{{ $lead->phone }}</td>
                            <td><span class="badge">{{ $lead->state ?? 'N/A' }}</span></td>
                            <td>{{ Str::limit($lead->message, 50) }}</td>
                            <td>{{ $lead->created_at->format('M d, Y H:i') }}</td>
                        </tr>
                        @endforeach
                    </tbody>
                </table>
            @else
                <div class="empty">
                    <p>No leads yet. They'll appear here when forms are submitted.</p>
                </div>
            @endif
        </div>
    </div>
</body>
</html>
