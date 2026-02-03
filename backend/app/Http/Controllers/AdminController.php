<?php

namespace App\Http\Controllers;

use App\Models\Lead;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class AdminController extends Controller
{
    public function loginForm()
    {
        if (Auth::check()) {
            return redirect('/admin/dashboard');
        }
        return view('admin.login');
    }

    public function login(Request $request)
    {
        $credentials = $request->validate([
            'email' => 'required|email',
            'password' => 'required'
        ]);

        if (Auth::attempt($credentials)) {
            $request->session()->regenerate();
            return redirect('/admin/dashboard');
        }

        return back()->with('error', 'Invalid credentials. Please try again.');
    }

    public function dashboard()
    {
        $leads = Lead::orderBy('created_at', 'desc')->take(50)->get();
        
        $stats = [
            'total' => Lead::count(),
            'today' => Lead::whereDate('created_at', today())->count(),
            'week' => Lead::whereBetween('created_at', [now()->startOfWeek(), now()->endOfWeek()])->count(),
            'month' => Lead::whereMonth('created_at', now()->month)->count(),
        ];

        return view('admin.dashboard', compact('leads', 'stats'));
    }

    public function logout(Request $request)
    {
        Auth::logout();
        $request->session()->invalidate();
        $request->session()->regenerateToken();
        return redirect('/admin');
    }
}
